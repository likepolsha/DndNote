import React from "react";
import { FileAddTwoTone } from "@ant-design/icons";

export const TxtDocUploader = ({ onLoadDoc }) => {
  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      onLoadDoc(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <label htmlFor="input__file" className="input_file-label">
      <input
        type="file"
        name="file"
        id="input__file"
        className="input input-file"
        onChange={showFile}
      />
      <FileAddTwoTone className="dnd-action_icon" />
    </label>
  );
};
