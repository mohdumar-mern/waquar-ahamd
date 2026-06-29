const skillService = require("../services/skill.service");
const ApiResponse  = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll  = asyncHandler(async (req, res) => ApiResponse.ok(res, await skillService.getAllSkills()));
exports.create  = asyncHandler(async (req, res) => ApiResponse.created(res, await skillService.createSkill(req.body)));
exports.update  = asyncHandler(async (req, res) => ApiResponse.ok(res, await skillService.updateSkill(req.params.id, req.body)));
exports.remove  = asyncHandler(async (req, res) => { await skillService.deleteSkill(req.params.id); ApiResponse.noContent(res); });
