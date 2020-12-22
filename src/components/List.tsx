import React, { useEffect, useState } from "react";
import { getTasks, reorderTasks } from "../services/tasks";
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function List() {
  const [tasks, setTasks] = useState([]);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    const newTasks: [] = getTasks();
    setTasks(newTasks);
  }, [tasks]);

  const handleDragEnd = (result: any) => {
    setDrag(false);
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
      <DragDropContext
        onDragStart={() => setDrag(true)}
        onDragEnd={handleDragEnd}
      >
        <div className="block to-do">
          <h3 className="title">To Do</h3>
          <Droppable droppableId={"to-do"}>
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list"
              >
                {tasks.map(
                  ({ name, type }, index) =>
                    type === "to-do" && (
                      <Draggable
                        draggableId={`${name}-${index}`}
                        index={index}
                        key={index}
                      >
                        {(provided: any) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="list-item"
                          >
                            <span className="item-title">{name}</span>
                          </div>
                        )}
                      </Draggable>
                    )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="block in-progress">
          <h3 className="title">In Progress</h3>
          <Droppable droppableId={"in-progress"}>
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list"
              >
                {tasks.map(
                  ({ name, type }, index) =>
                    type === "in-progress" && (
                      <Draggable
                        draggableId={`${name}-${index}`}
                        index={index}
                        key={index}
                      >
                        {(provided: any) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="list-item"
                          >
                            <span className="item-title">{name}</span>
                          </div>
                        )}
                      </Draggable>
                    )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="block done">
          <h3 className="title">Done</h3>
          <Droppable droppableId={"done"}>
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list"
              >
                {tasks.map(
                  ({ name, type }, index) =>
                    type === "done" && (
                      <Draggable
                        draggableId={`${name}-${index}`}
                        index={index}
                        key={index}
                      >
                        {(provided: any) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="list-item done"
                          >
                            <span className="item-title">{name}</span>
                          </div>
                        )}
                      </Draggable>
                    )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}
