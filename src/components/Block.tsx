import React from "react";
// @ts-ignore
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import Item from "./Item";

interface Props {
  tasks: Array<any>;
  listName: string;
  listTitle: string;
}

export default function Block({ tasks, listName, listTitle }: Props) {
  return (
    <Droppable droppableId={listName}>
      {(provided: any, snapshot: any) => (
        <div
          className={`block ${listName}`}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#e2e2e2" : "#F2EFEF",
          }}
        >
          <h3 className="title">{listTitle}</h3>
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list"
          >
            {tasks.length > 0 &&
              tasks.map(
                ({ name, type }: Item, index: number) =>
                  type === listName && (
                    <ListItem
                      type={type}
                      key={index}
                      name={name}
                      index={index}
                    />
                  )
              )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
