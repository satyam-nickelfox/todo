import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, TODOLIST } from "./redux/slice/todoSlice";
const App: FC = () => {
  const dispatch = useDispatch();
  const getList = useSelector(TODOLIST);

  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine(0);
    dispatch(addTodo([...todoList, newTask]));
  };

  const completeTask = (taskNameToDelete: string): void => {
    const removeTask = todoList.filter((task) => {
      return task.taskName !== taskNameToDelete;
    });
    setTodoList(removeTask);
    dispatch(addTodo(removeTask));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {getList &&
          getList.toDoList.map((task: ITask, key: number) => {
            return (
              <TodoTask key={key} task={task} completeTask={completeTask} />
            );
          })}
      </div>
    </div>
  );
};

export default App;
