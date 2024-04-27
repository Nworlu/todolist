import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useReducer } from "react";
import CheckIcon from "./assets/check.svg";
import DeleteIcon from "./assets/delete.svg";
import "./App.css";
import { initialTodos, reducer } from "./reducers/todoListReducer";

function App() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  console.log(todos);
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

  return (
    <section className="bg-[#1E1E1E]">
      <div className="bg-[#1D1825] rounded-[20px] min-w-[320px] min-h-[500px] lg:w-[600px] flex flex-col items-center py-[50px] px-[10px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[15px]">
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
          </div>
          <p className="text-red-500 text-[13px]">{message}</p>
        </div>
        <div className="lg:w-[432px]">
          <h1 className="text-white my-[20px]">
            Tasks to do -{" "}
            {todos.filter((todo) => todo.complete === false).length} Tasks
            Completed - {todos.filter((todo) => todo.complete === true).length}
          </h1>
          <div className="w-full flex flex-col gap-[16px]">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-[10px] bg-[#15101C] w-full h-[75px] px-[20px]"
              >
                <p
                  className={`text-[#fff] ${
                    todo.complete === true ? "line-through" : ""
                  } `}
                >
                  {todo.title}
                  {todo.complete}
                </p>
                <div className="flex items-center gap-[5px]">
                  <button
                    type="button"
                    onClick={() => handleCheckButton(index)}
                  >
                    <img src={CheckIcon} width={30} height={30} />
                  </button>
                  <button type="button" onClick={() => handleDeleteTask(index)}>
                    <img src={DeleteIcon} width={30} height={30} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
