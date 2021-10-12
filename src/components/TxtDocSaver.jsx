import React from "react";
import { format } from "date-fns";
import { SaveTwoTone } from "@ant-design/icons";

export const TxtDocSaver = ({ characters, important, settings }) => {
  const jsonChars = JSON.stringify(characters);
  const jsonImp = JSON.stringify(important);
  const jsonSettings = JSON.stringify(settings);

  const downloadTxtFile = () => {
    const date = format(new Date(), "dd.MM.yyyy HH.mm");
    const element = document.createElement("a");
    const file = new Blob([`${jsonChars} \n ${jsonImp} \n ${jsonSettings}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `dnd ${date}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return <SaveTwoTone className="dnd-action_icon" onClick={downloadTxtFile} />;
};
