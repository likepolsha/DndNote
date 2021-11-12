import React from "react";
import { FileAddTwoTone } from "@ant-design/icons";
import { fileValidator } from "../../functions/fileValidator";
import { message } from "antd";

export const TxtDocUploader = ({ onLoadDoc }) => {
  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      if (!fileValidator(text)) {
        return message.error("Некорректный файл");
      }
      onLoadDoc(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <label htmlFor="input__file" className="input_file-label">
      <input
        type="file"
        accept=".txt"
        name="file"
        id="input__file"
        className="input input-file"
        onChange={showFile}
      />
      <FileAddTwoTone className="dnd-action_icon" />
    </label>
  );
};
