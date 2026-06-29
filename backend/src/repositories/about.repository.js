const BaseRepository = require("./base.repository");
const About = require("../models/About.model");

class AboutRepository extends BaseRepository {
  constructor() { super(About); }
  async findActive() { return this.model.findOne({ isActive: true }).lean(); }
}

module.exports = new AboutRepository();
