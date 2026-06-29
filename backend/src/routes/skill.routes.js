const router = require("express").Router();
const ctrl   = require("../controllers/skill.controller");
const auth   = require("../middlewares/auth.middleware");

router.get("/",       ctrl.getAll);
router.post("/",   ctrl.create);
router.put("/:id",auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);
// router.post("/",  auth, ctrl.create);
// router.put("/:id",auth, ctrl.update);
// router.delete("/:id", auth, ctrl.remove);

module.exports = router;
