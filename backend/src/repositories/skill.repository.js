const BaseRepository = require("./base.repository");
const Skill = require("../models/Skill.model");

class SkillRepository extends BaseRepository {
  constructor() { super(Skill); }
  async findVisible() { return this.model.find({ isVisible: true }).sort({ category: 1, order: 1 }).lean(); }
}

module.exports = new SkillRepository();
