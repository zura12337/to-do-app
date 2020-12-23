import React from "react";
// @ts-ignore
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";

interface Props {
  tasks: Array<any>;
  listName: string;
}

interface Item {
  name: string;
  index: number;
  type: string;
}

export default function Block({ tasks, listName }: Props) {
  return (
    <Droppable droppableId={listName}>
      {(provided: any, snapshot: any) => (
        <div
          className={`block ${listName}`}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#e2e2e2" : "#F2EFEF",
          }}
        >
          <h3 className="title">To Do</h3>
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list"
          >
            {tasks.map(
              ({ name, type }: Item, index: number) =>
                type === listName && (
                  <ListItem key={index} name={name} index={index} />
                )
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
