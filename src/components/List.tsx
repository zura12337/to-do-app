import React, { useEffect, useState } from "react";
import { getTasks, reorderTasks } from "../services/tasks";
// @ts-ignore
import { DragDropContext } from "react-beautiful-dnd";
import Block from "./Block";

export default function List() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const newTasks: [] = getTasks();
    setTasks(newTasks);
  }, [tasks]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newTasks = [...tasks];

    if (result.source.droppableId !== result.destination.droppableId) {
      let item: { type: string; name: string } = newTasks[result.source.index];
      item.type = result.destination.droppableId;
    }
    const [reorderedTasks] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedTasks);

    reorderTasks(newTasks);
    setTasks(newTasks);
  };

  return (
    <div className="content">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Block tasks={tasks} listName="to-do" listTitle={"To Do"} />
        <Block tasks={tasks} listName="in-progress" listTitle={"In Progress"} />
        <Block tasks={tasks} listName="done" listTitle={"Done"} />
      </DragDropContext>
    </div>
  );
}
