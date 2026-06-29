const router  = require("express").Router();
const { API_VERSION = "v1" } = process.env;

router.use(`/${API_VERSION}/health`,   require("./health.routes"));
router.use(`/${API_VERSION}/projects`, require("./project.routes"));
router.use(`/${API_VERSION}/skills`,   require("./skill.routes"));
router.use(`/${API_VERSION}/contact`,  require("./contact.routes"));
router.use(`/${API_VERSION}/about`,    require("./about.routes"));

module.exports = router;
