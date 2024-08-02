const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
  login,
} = require("../controllers/users.controller");

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);

module.exports = router;
