import React from "react";
// @ts-ignore
import { Draggable } from "react-beautiful-dnd";
import Item from "./Item";

export default function ListItem({ name, index, type }: Item) {
  return (
    <Draggable draggableId={`${name}-${index}`} index={index} key={index}>
      {(provided: any, snapshot: any) => {
        if (snapshot.draggingOver === "trash") {
          console.log(snapshot);
        }
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDragging
                ? "#ebebeb"
                : type === "done"
                ? "#888888"
                : "#ffffff",
              color: type === "done" && !snapshot.isDragging && "white",
              animation: ".2s all",
              ...provided.draggableProps.style,
            }}
            className="list-item"
          >
            <span className="item-title">{name}</span>
          </div>
        );
      }}
    </Draggable>
  );
}
