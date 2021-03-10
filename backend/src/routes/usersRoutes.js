const router = require("express").Router();

const UsersControllers = require("../controller/usersControllers");


const authentication = require("../middlewares/authentication");

router.post("/", authentication, UsersControllers.create);
router.get("/:id", UsersControllers.showOne);
router.get("/", UsersControllers.showAll);
router.delete("/:id", authentication, UsersControllers.delete);

module.exports = router;
