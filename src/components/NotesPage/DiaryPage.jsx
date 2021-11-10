import { Input } from "antd";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;

export default function DiaryPage({ title, text, onChange }) {
  const [inputingTitle, setInputingTitle] = useState(false);

  const [localTitle, setLocalTitle] = useState(title);
  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);
  useEffect(() => {
    setLocalText(text);
  }, [text]);

  return (
    <div className="DiaryPage-root">
      {inputingTitle ? (
        <Input
          size="small"
          style={{ fontSize: 18, width: "25vw" }}
          value={localTitle}
          onChange={(e) => {
            const val = e.target.value;
            setLocalTitle(val);
          }}
          onBlur={() => {
            setInputingTitle(false);
            setLocalTitle(title);
          }}
          onKeyPress={(e) => {
            if (e.which === 13) {
              setInputingTitle(false);
              onChange({
                title: localTitle,
                text: text,
              });
            }
          }}
        />
      ) : (
        <div
          className="diary_page-title"
          onDoubleClick={() => setInputingTitle(true)}
        >
          {title}
        </div>
      )}
      <TextArea
        style={{ flex: 1, marginBottom: 10 }}
        value={localText}
        placeholder="Введите текст"
        onChange={(e) => {
          const val = e.target.value;
          setLocalText(val);
        }}
        onBlur={() =>
          onChange({
            title: title,
            text: localText,
          })
        }
      />
    </div>
  );
}
