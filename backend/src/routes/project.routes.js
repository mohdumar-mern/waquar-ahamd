const router  = require("express").Router();
const ctrl    = require("../controllers/project.controller");
const auth    = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createProjectRules, updateProjectRules } = require("../validators/project.validator");

router.get("/",            ctrl.getAll);
router.get("/featured",    ctrl.getFeatured);
router.get("/:slug",       ctrl.getBySlug);
router.post("/",     createProjectRules, validate, ctrl.create);
router.put("/:id", updateProjectRules, validate, ctrl.update);
router.delete("/:id", auth, ctrl.remove);
// router.post("/",    auth, createProjectRules, validate, ctrl.create);
// router.put("/:id",  auth, updateProjectRules, validate, ctrl.update);
// router.delete("/:id", auth, ctrl.remove);

module.exports = router;
