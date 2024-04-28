import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useReducer } from "react";
import CheckIcon from "./assets/check.svg";
import DeleteIcon from "./assets/delete.svg";
import "./App.css";
import { motion } from "framer-motion";
import { initialTodos, reducer } from "./reducers/todoListReducer";
import { toast } from "react-toastify";
function App() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [searchData, setSearchData] = useState("");
  const handleCheckButton = (index) => {
    // console.log(todo.id, "app");
    dispatch({ type: "COMPLETE", id: index });
  };
  const handleAddTask = () => {
    if (text === "") {
      setMessage("Please fill in the task");
      return;
    }
    setText("");

    dispatch({
      type: "ADD_TASKS",
      payload: text,
    });
  };
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  const handleDeleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", id: index });
  };
  console.log(searchData);

  useEffect(() => {
    if (todos.length > 0 && todos.map((item) => item.complete === false)) {
      setTimeout(() => {
        toast.warn(
          `You have ${
            todos.map((item) => item.complete === false).length
          } unfinished list`
        );
      }, 6000);
    }
  }, [todos]);

  return (
    <section className="bg-[#1E1E1E]">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="bg-[#1D1825] rounded-[20px] min-w-[320px] min-h-[500px] lg:w-[600px] flex flex-col items-center py-[50px] px-[10px]"
      >
        <div className="flex flex-col gap-[10px]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="flex items-center gap-[15px]"
          >
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              name="todos"
              className="border border-[#9E78CF] px-[10px] py-[7px] h-[32px] bg-transparent lg:w-[300px] rounded-[12px] text-white"
              placeholder="Add a new task"
            />
            <button
              type="button"
              onClick={handleAddTask}
              className="bg-[#9E78CF] text-white px-[12px]  w-[32px] h-[32px] rounded-[10px]"
            >
              +
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="flex items-center gap-[15px]"
          >
            <input
              onChange={(e) => setSearchData(e.target.value)}
              value={searchData}
              type="text"
              name="todos"
              className="border border-[#9E78CF] px-[10px] py-[7px] h-[32px] bg-transparent lg:w-[300px] rounded-[12px] text-white"
              placeholder="Search for tasks..."
            />
          </motion.div>

          <p className="text-red-500 text-[13px]">{message}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          className="lg:w-[432px]"
        >
          <h1 className="text-white my-[20px]">
            Tasks to do -{" "}
            {todos.filter((todo) => todo.complete === false).length} Tasks
            Completed - {todos.filter((todo) => todo.complete === true).length}
          </h1>
          <div className="w-full flex flex-col gap-[16px]">
            {todos
              .filter((item) =>
                item.title.toLowerCase().includes(searchData.toLowerCase())
              )
              .map((todo, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  key={index}
                  className="flex items-center justify-between rounded-[10px] bg-[#15101C] w-full h-[75px] px-[20px]"
                >
                  <p
                    className={`text-[#fff] ${
                      todo.complete === true
                        ? "line-through text-green-600"
                        : "text-yellow-500"
                    } `}
                  >
                    {todo.title}
                  </p>
                  <div className="flex items-center gap-[5px]">
                    <button
                      type="button"
                      onClick={() => handleCheckButton(index)}
                    >
                      <img src={CheckIcon} width={30} height={30} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(index)}
                    >
                      <img src={DeleteIcon} width={30} height={30} />
                    </button>
                  </div>
                </motion.div>
              ))}
            {todos.filter((item) =>
              item.title.toLowerCase().includes(searchData.toLowerCase())
            ).length === 0 && (
              <div className="text-[#fff] text-center mt-4">
                No results found.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default App;
