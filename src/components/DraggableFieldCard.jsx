// components/DraggableFieldCard.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaGripVertical } from "react-icons/fa";

const ItemType = "FIELD";

const DraggableFieldCard = ({ field, index, moveField, children }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index === index) return;
      moveField(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`rounded-xl shadow-md bg-white p-4 mb-4 transition-all duration-200 border hover:shadow-lg ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center mb-2">
        <span className="text-gray-500 cursor-move mr-2">
          <FaGripVertical />
        </span>
        <h4 className="text-md font-semibold text-gray-700">{field.label || "Field"}</h4>
      </div>
      {children}
    </div>
  );
};

export default DraggableFieldCard;
