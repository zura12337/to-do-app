import React from "react";
// @ts-ignore
import { Draggable } from "react-beautiful-dnd";

interface Item {
  name: string;
  index: number;
}

export default function ListItem({ name, index }: Item) {
  return (
    <Draggable draggableId={`${name}-${index}`} index={index} key={index}>
      {(provided: any, snapshot: any) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDragging ? "#ebebeb" : "#ffffff",
            animation: ".2s all",
            ...provided.draggableProps.style,
          }}
          className="list-item"
        >
          <span className="item-title">{name}</span>
        </div>
      )}
    </Draggable>
  );
}
