/**
 * BaseRepository — generic CRUD layer wrapping Mongoose.
 * All domain repositories extend this.
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}, projection = {}, options = {}) {
    return this.model.find(filter, projection, options).lean();
  }

  async findById(id) {
    return this.model.findById(id).lean();
  }

  async findOne(filter) {
    return this.model.findOne(filter).lean();
  }

  async create(data) {
    return this.model.create(data);
  }

  async updateById(id, data, options = { new: true, runValidators: true }) {
    return this.model.findByIdAndUpdate(id, data, options).lean();
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async paginate(filter = {}, { page = 1, limit = 10, sort = { createdAt: -1 }, populate = "" } = {}) {
    const skip  = (page - 1) * limit;
    const total = await this.count(filter);
    const data  = await this.model.find(filter).sort(sort).skip(skip).limit(limit).populate(populate).lean();
    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }
}

module.exports = BaseRepository;
