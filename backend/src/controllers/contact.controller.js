const contactService = require("../services/contact.service");
const ApiResponse    = require("../utils/ApiResponse");
const asyncHandler   = require("../utils/asyncHandler");

exports.submit = asyncHandler(async (req, res) => {
  const contact = await contactService.submitContact(req.body, req.ip);
  ApiResponse.created(res, { id: contact._id }, "Message received! Waquar will be in touch soon.");
});

exports.getAll = asyncHandler(async (req, res) => {
  const data = await contactService.getAll(req.query);
  ApiResponse.ok(res, data);
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const data = await contactService.updateStatus(req.params.id, req.body.status);
  ApiResponse.ok(res, data, "Status updated");
});
