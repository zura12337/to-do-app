import React from "react";
import List from "./components/List";
import NavBar from "./components/NavBar";
import { useLocalStorage } from "./services/tasks";

function App() {
  const [tasks, setTasks] = useLocalStorage([{}]);

  return (
    <>
      <NavBar tasks={tasks} setTasks={setTasks} />
      <List tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
