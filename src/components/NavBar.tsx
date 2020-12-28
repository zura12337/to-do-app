import React, { useState } from "react";

// @ts-ignore
export default function NavBar({ tasks, setTasks }) {
  const [expanded, setExpanded] = useState(false);
  const [task, setTask] = useState("");

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setExpanded(false);
    if (task.length < 1) return;
    setTasks([{ type: "to-do", name: task }, ...tasks]);
  };

  return (
    <div>
      <nav>
        <button onClick={handleClick} className="add-new-task">
          Add Task
        </button>
        {expanded && (
          <form onSubmit={handleSubmit} className="new-task-form">
            <input
              onChange={(e) => setTask(e.target.value)}
              type="text"
              name="name"
              placeholder="Enter To Do..."
            />
            <button type="submit" className="submit-form">
              ✔️
            </button>
          </form>
        )}
      </nav>
    </div>
  );
}
