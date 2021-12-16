import React from "react";
import { Tag } from "antd";

export default function TagRender({ tagsList, value, color, ...p }) {
  const tag = tagsList.find((el) => el.label === value);
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={tag?.color}
      onMouseDown={onPreventMouseDown}
      {...p}
      style={{ marginRight: 3 }}
    >
      {value}
    </Tag>
  );
}
