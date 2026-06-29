const projectRepo = require("../repositories/project.repository");
const ApiError    = require("../utils/ApiError");
const slugify     = require("../utils/slugify");

class ProjectService {
  async getAllProjects({ page = 1, limit = 9, category } = {}) {
    const filter = category ? { category } : {};
    return projectRepo.findPublished({ page, limit, filter, sort: { order: 1 } });
  }

  async getFeatured() {
    return projectRepo.findFeatured();
  }

  async getBySlug(slug) {
    const project = await projectRepo.findBySlug(slug);
    if (!project) throw ApiError.notFound(`Project "${slug}" not found`);
    return project;
  }

  async createProject(data) {
    data.slug = slugify(data.title);
    const exists = await projectRepo.findOne({ slug: data.slug });
    if (exists) data.slug = `${data.slug}-${Date.now()}`;
    return projectRepo.create(data);
  }

  async updateProject(id, data) {
    if (data.title) data.slug = slugify(data.title);
    const updated = await projectRepo.updateById(id, data);
    if (!updated) throw ApiError.notFound("Project not found");
    return updated;
  }

  async deleteProject(id) {
    const deleted = await projectRepo.deleteById(id);
    if (!deleted) throw ApiError.notFound("Project not found");
    return { message: "Project deleted" };
  }
}

module.exports = new ProjectService();
