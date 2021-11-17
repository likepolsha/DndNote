import React from "react";
import { format } from "date-fns";
import { SaveTwoTone } from "@ant-design/icons";

import { store } from "../../common/store";

export const TxtDocSaver = () => {
  const downloadTxtFile = () => {
    const jsonChars = JSON.stringify(store.chars || []);
    const jsonImp = JSON.stringify(store.imp || "");
    const jsonDiary = JSON.stringify(
      store.diary || [
        {
          title: "Заголовок 1",
          text: "",
        },
      ]
    );

    const date = format(new Date(), "dd.MM.yyyy HH.mm");
    const element = document.createElement("a");
    const file = new Blob([`${jsonChars} \n ${jsonImp} \n ${jsonDiary}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `dnd ${date}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return <SaveTwoTone className="dnd-action_icon" onClick={downloadTxtFile} />;
};
