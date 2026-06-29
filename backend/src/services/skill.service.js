const skillRepo = require("../repositories/skill.repository");
const ApiError  = require("../utils/ApiError");

class SkillService {
  async getAllSkills()    { return skillRepo.findVisible(); }
  async createSkill(data){ return skillRepo.create(data); }
  async updateSkill(id, data) {
    const s = await skillRepo.updateById(id, data);
    if (!s) throw ApiError.notFound("Skill not found");
    return s;
  }
  async deleteSkill(id) {
    const s = await skillRepo.deleteById(id);
    if (!s) throw ApiError.notFound("Skill not found");
  }
}

module.exports = new SkillService();
