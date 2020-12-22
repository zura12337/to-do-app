import React, { useState } from "react";
import { createTask } from "../services/tasks";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [task, setTask] = useState("");

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setExpanded(false);
    if (task.length < 1) return;
    createTask({ type: "to-do", name: task });
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
