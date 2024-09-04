const taskModel = require("../models/taskSchema");

const createtask = async (req, res) => {
  const data = req.body;
  try {
    const task = new taskModel(data);
    await task.save();
    res.status(200).json({ message: "task created", success: true });
  } catch (error) {
    res.status(500).json({ message: "error creatting data", success: false });
  }
};

const fetchAlltask = async (req, res) => {
  try {
    const data = await taskModel.find({});
    res.status(200).json({ message: "all data fetched", success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching all data", success: false });
  }
};

const updateTask = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const obj = { $set: { ...body } };
  try {
    const data = await taskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "data updated ", success: true, data });
  } catch (error) {
    res.status(500).json({ message: "error updating data", success: false });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await taskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "data deleted ", success: true, data });
  } catch (error) {
    res.status(500).json({ message: "error deleting data", success: false });
  }
};

module.exports = {
  createtask,
  fetchAlltask,
  updateTask,
  deleteTask,
};
