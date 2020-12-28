import React, { useState } from "react";
// @ts-ignore
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Block from "./Block";
// @ts-ignore
import { CSSTransition } from "react-transition-group";
import { useLocalStorage } from "../services/tasks";

export default function List() {
  const [tasks, setTasks] = useLocalStorage([{}]);
  const [showPopover, setShowPopover] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newTasks = [...tasks];
    if (result.destination.droppableId === "trash") {
      newTasks.splice(result.source.index, 1);
    } else {
      if (result.source.droppableId !== result.destination.droppableId) {
        let item: { type: string; name: string } =
          newTasks[result.source.index];
        item.type = result.destination.droppableId;
      }
      const [reorderedTasks] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, reorderedTasks);
    }
    setTasks(newTasks);
  };

  return (
    <div className="content">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Block tasks={tasks} listName="to-do" listTitle={"To Do"} />
        <Block tasks={tasks} listName="in-progress" listTitle={"In Progress"} />
        <Block tasks={tasks} listName="done" listTitle={"Done"} />
        <Droppable droppableId="trash">
          {(provided: any, snapshot: any) => (
            <div
              className="trash"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="trash-inner">
                <CSSTransition
                  in={showPopover}
                  timeout={300}
                  classNames="trash"
                  unmountOnExit
                >
                  <div className="trash-popover">
                    <p>Drag Any item here to remove them. 🗑</p>
                  </div>
                </CSSTransition>
                {/* {showPopover && (
                  <div className="trash-popover">
                    <p>Drag Any item here to remove them. 🗑</p>
                    <button
                      className="popover-close"
                      onClick={() => setShowPopover(false)}
                    >
                      X
                    </button>
                  </div>
                )} */}
                <h3 onClick={() => setShowPopover(!showPopover)}>🗑</h3>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
