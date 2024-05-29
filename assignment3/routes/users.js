const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {resolveIndexByUserId} = require("../middleware/userMiddleware");

router.get("/users", userController.getUser);
router.post("/users", userController.createUser);
router.put("/users/:id", resolveIndexByUserId, userController.updateUser);
router.patch("users/:id", resolveIndexByUserId, userController.patchUser);
router.delete("/users/:id", resolveIndexByUserId, userController.deleteUser);
router.get("/users/:id", resolveIndexByUserId, userController.userById);

module.exports = router;
