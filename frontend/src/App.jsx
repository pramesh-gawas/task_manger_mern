import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FaCheck, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTask, UpdateTaskById } from "../api";

function App() {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [Copytask, setCopytask] = useState([]);
  const [update, setUpdate] = useState(null);
  const fetchAllTask = async () => {
    try {
      const { data } = await GetAllTask();
      setTask(data);
      setCopytask(data);
    } catch (err) {
      toast("failed to create task ", "error");
    }
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  const handleChange = (e) => {
    const inputChange = e.target.value;
    setInput(inputChange);
  };

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { msessage, success } = await CreateTask(obj);
      if (success?.status == false) {
        //success toast
        toast(msessage, "error");
      } else {
        //error toast
        toast(msessage, "success");
      }
    } catch (err) {
      toast("failed to create task ", "error");
    }
    fetchAllTask();
  };

  const handleDelete = async (id) => {
    try {
      const { msessage, success } = await DeleteTaskById(id);
      if (success?.status == false) {
        //success toast
        toast(msessage, "error");
      } else {
        //error toast
        toast(msessage, "success");
      }
    } catch (err) {
      toast("failed to delete task ", "error");
    }
    fetchAllTask();
  };

  const UpdateCheck = async (item) => {
    const { _id, taskName, isDone } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };

    try {
      const { msessage, success } = await UpdateTaskById(_id, obj);
      if (success?.status == false) {
        //success toast
        toast(msessage, "error");
      } else {
        //error toast
        toast(msessage, "success");
      }
    } catch (err) {
      toast("failed to check task ", "error");
    }
    fetchAllTask();
  };

  const updateItems = async (item) => {
    const { _id, taskName, isDone } = item;
    const obj = {
      taskName,
      isDone: isDone,
    };
    try {
      const { msessage, success } = await UpdateTaskById(_id, obj);
      if (success?.status == false) {
        //success toast
        toast(msessage, "error");
      } else {
        //error toast
        toast(msessage, "success");
      }
    } catch (err) {
      toast("failed to check task ", "error");
    }
    fetchAllTask();
  };

  useEffect(() => {
    if (update) {
      setInput(update.taskName);
    }
  }, [update]);

  const UpdateTask = () => {
    if (update && input) {
      const obj = {
        taskName: input,
        isDone: update.isDone,
        _id: update._id,
      };
      updateItems(obj);
      //THIS IS UPDATE API CALL
    } else if (update === null && input) {
      //this is a create api call
      handleAddTask();
    }
    setInput(" ");
  };

  const SearchChange = (e) => {
    const term = e.target.value;
    const oldtask = [...Copytask];
    const result = oldtask.filter((item) => item.taskName.includes(term));
    setTask(result);
  };

  return (
    <div className="d-flex  flex-column align-items-center mt-5 ms-5 me-5 ">
      <h1 className="mb-5">todo app</h1>
      {/* input and search  */}

      <div className="d-flex align-items-center  justify-content-between  w-100 mb-4 m-auto  ">
        <div className=" input-group flex-grow-1 me-2 `">
          <input
            type="text"
            className="form-control me-1"
            placeholder="Add a new task"
            value={input}
            onChange={handleChange}
          />
          <button className="btn btn-success btn-sm me-2" onClick={UpdateTask}>
            <FaPlus className="m-2"></FaPlus>
          </button>
        </div>
        <div className="input-group flex-grow-1  ">
          <span className="input-group-text">
            <FaSearch></FaSearch>
          </span>
          <input
            onChange={SearchChange}
            type="text"
            className="form-control me-1 "
            placeholder="enter task to search "
          />
        </div>
      </div>
      {/* list of items  */}
      <div className="d-flex flex-column w-100 ">
        {task.map((item) => (
          <div
            className="
           p-2 border bg-light rounded-3 align-items-center justify-content-between w-100"
            key={item._id}
          >
            <span className={item.isDone ? "text-decoration-line-through" : ""}>
              {item.taskName}
            </span>
            <div className="d-flex align-items-center justify-content-end">
              <button
                className="btn btn-success sm me-2"
                type="button"
                onClick={() => UpdateCheck(item)}
              >
                <FaCheck></FaCheck>
              </button>
              <button
                onClick={() => setUpdate(item)}
                className="btn btn-primary sm me-2"
                type="button"
              >
                <FaPen></FaPen>
              </button>
              <button
                className="btn btn-danger sm me-2"
                type="button"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash></FaTrash>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* tostify */}
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        ></ToastContainer>
      </div>
    </div>
  );
}

export default App;
