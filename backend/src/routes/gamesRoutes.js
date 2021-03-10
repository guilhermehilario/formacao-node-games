const router = require("express").Router();

const GamesController = require("../controller/gamesControllers");

const authenticate = require("../middlewares/authentication");

router.post("/", authenticate, GamesController.create);
router.get("/:id", authenticate, GamesController.showOne);
router.get("/", authenticate, GamesController.showAll);
router.get("/search/:title", authenticate, GamesController.search);
router.put("/:id", authenticate, GamesController.update);
router.delete("/:id", authenticate, GamesController.delete);

module.exports = router;
