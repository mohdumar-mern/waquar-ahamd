const aboutService = require("../services/about.service");
const ApiResponse  = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.get    = asyncHandler(async (req, res) => ApiResponse.ok(res, await aboutService.getAbout()));
exports.upsert = asyncHandler(async (req, res) => ApiResponse.ok(res, await aboutService.upsertAbout(req.body), "About updated"));
