const router = require("express").Router();
const {
  createtask,
  fetchAlltask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
router.post("/", createtask);
router.get("/", fetchAlltask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
