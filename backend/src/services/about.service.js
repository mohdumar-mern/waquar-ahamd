const aboutRepo = require("../repositories/about.repository");
const ApiError  = require("../utils/ApiError");

class AboutService {
  async getAbout() {
    const about = await aboutRepo.findActive();
    if (!about) throw ApiError.notFound("About data not configured");
    return about;
  }

  async upsertAbout(data) {
    const existing = await aboutRepo.findActive();
    if (existing) return aboutRepo.updateById(existing._id, data);
    return aboutRepo.create({ ...data, isActive: true });
  }
}

module.exports = new AboutService();
