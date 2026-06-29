const contactRepo  = require("../repositories/contact.repository");
const emailService = require("./email.service");
const ApiError     = require("../utils/ApiError");

class ContactService {
  async submitContact(data, ip) {
    const contact = await contactRepo.create({ ...data, ip });

    // Fire-and-forget email notification
    emailService.sendContactNotification(contact).catch(() => {});

    return contact;
  }

  async getAll({ page = 1, limit = 20, status } = {}) {
    const filter = status ? { status } : {};
    return contactRepo.paginate(filter, { page, limit });
  }

  async updateStatus(id, status) {
    const updated = await contactRepo.updateById(id, { status });
    if (!updated) throw ApiError.notFound("Message not found");
    return updated;
  }
}

module.exports = new ContactService();
