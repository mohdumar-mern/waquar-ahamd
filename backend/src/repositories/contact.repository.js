const BaseRepository = require("./base.repository");
const Contact = require("../models/Contact.model");

class ContactRepository extends BaseRepository {
  constructor() { super(Contact); }
  async findByStatus(status) { return this.model.find({ status }).sort({ createdAt: -1 }).lean(); }
}

module.exports = new ContactRepository();
