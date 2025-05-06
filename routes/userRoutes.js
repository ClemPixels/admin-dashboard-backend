const express = require("express");
const {
  getUsers,
  addUsers,
  updateUser,
  deleteUser,
  uploadUserImage,
} = require("../controllers/userController");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/upload", upload.single("image"), uploadUserImage);

module.exports = router;
