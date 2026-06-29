const router = require("express").Router();
const ctrl   = require("../controllers/about.controller");
const auth   = require("../middlewares/auth.middleware");

router.get("/",    ctrl.get);
router.put("/",  ctrl.upsert);
// router.put("/", auth, ctrl.upsert);

module.exports = router;
