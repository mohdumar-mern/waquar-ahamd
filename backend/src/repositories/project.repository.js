const BaseRepository = require("./base.repository");
const Project = require("../models/Project.model");

class ProjectRepository extends BaseRepository {
  constructor() { super(Project); }

  async findBySlug(slug)         { return this.model.findOne({ slug, isPublished: true }).lean(); }
  async findFeatured()           { return this.model.find({ featured: true, isPublished: true }).sort({ order: 1 }).lean(); }
  async findByCategory(category) { return this.model.find({ category, isPublished: true }).sort({ order: 1 }).lean(); }
  async findPublished(query)     { return this.paginate({ isPublished: true, ...query.filter }, query); }
}

module.exports = new ProjectRepository();
