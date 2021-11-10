import React, { useEffect, useState } from "react";
import { Drawer, Input, Row } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import c from "classnames";

const { TextArea } = Input;

export default function DiaryPage({
  title,
  text,
  onChange,
  diaryArr,
  currPage,
  onChangePage,
}) {
  const [inputingTitle, setInputingTitle] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);

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
      <Row justify="space-between" align="middle" style={{ padding: "0 2px" }}>
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

        <UnorderedListOutlined
          className="diary_page-structure_icon"
          onClick={() => setVisibleDrawer(true)}
        />
      </Row>
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

      <Drawer
        className="diary_page-drawer"
        title="Навигация"
        placement="right"
        contentWrapperStyle={{ width: 410 }}
        visible={visibleDrawer}
        onClose={() => setVisibleDrawer(false)}
      >
        {diaryArr.map((item, index) => (
          <div
            key={index}
            className={c("diary_page-structure_item", {
              active: index === currPage - 1,
            })}
            onClick={() => {
              if (currPage !== index + 1) {
                onChangePage(index + 1);
              }
              setVisibleDrawer(false);
            }}
          >
            {item.title}
          </div>
        ))}
      </Drawer>
    </div>
  );
}
