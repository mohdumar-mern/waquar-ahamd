const projectService = require("../services/project.service");
const ApiResponse    = require("../utils/ApiResponse");
const asyncHandler   = require("../utils/asyncHandler");

exports.getAll    = asyncHandler(async (req, res) => {
  const { page, limit, category } = req.query;
  const data = await projectService.getAllProjects({ page, limit, category });
  ApiResponse.ok(res, data, "Projects fetched");
});

exports.getFeatured = asyncHandler(async (req, res) => {
  const data = await projectService.getFeatured();
  ApiResponse.ok(res, data, "Featured projects fetched");
});

exports.getBySlug = asyncHandler(async (req, res) => {
  const data = await projectService.getBySlug(req.params.slug);
  ApiResponse.ok(res, data);
});

exports.create = asyncHandler(async (req, res) => {
  const data = await projectService.createProject(req.body);
  ApiResponse.created(res, data, "Project created");
});

exports.update = asyncHandler(async (req, res) => {
  const data = await projectService.updateProject(req.params.id, req.body);
  ApiResponse.ok(res, data, "Project updated");
});

exports.remove = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  ApiResponse.noContent(res);
});
