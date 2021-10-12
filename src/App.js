import React, { useEffect, useState } from "react";
import { Affix, Button, Col, Input, Popover, Row, Space } from "antd";
import { SettingTwoTone } from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import c from "classnames";

import CharacterInfo from "./components/CharacterInfo";
import { TxtDocSaver } from "./components/TxtDocSaver";
import { TxtDocUploader } from "./components/TxtDocUploader";

import "antd/dist/antd.css";
import { getItemFromLocal } from "./functions/getItemFromLocal";
import Settings from "./components/Settings";

const { TextArea } = Input;

function App() {
  const [visibleSettings, setVisibleSettings] = useState(false);
  const [containerRef, setContainerRef] = useState(null);

  const [settings, setSettings] = useState({
    douleClickForDlete: true,
    enableClors: true,
  });
  const [characters, setCharacters] = useState([]);
  const [important, setImportant] = useState("");

  const getAllFromLocal = () => {
    const $characters = getItemFromLocal("chars") || [];
    const $important = getItemFromLocal("imp");
    const $settings = getItemFromLocal("settings");

    setCharacters($characters);
    setImportant($important);
    setSettings((state) => ({ ...state, ...$settings }));
  };

  const saveToLocal = (key, el) => {
    const jsonEl = JSON.stringify(el);

    localStorage.setItem(key, jsonEl);
  };

  const addCharacter = () => {
    setCharacters((state) => [
      ...state,
      {
        id: Date.now(),
        name: "",
        info: "",
        color: "#fff",
      },
    ]);
  };

  const deleteCharacter = (id) => {
    const chars = [...characters];
    const index = characters.findIndex((item) => item.id === id);

    chars.splice(index, 1);

    setCharacters(chars);
    saveToLocal("chars", chars);
  };

  const onCharacterChange = ({ id, el }) => {
    const chars = [...characters];
    const index = characters.findIndex((item) => item.id === id);

    chars.splice(index, 1, { ...el, id });

    setCharacters(chars);
    saveToLocal("chars", chars);
  };

  const onDragEnd = ({ draggableId, destination, source }) => {
    const chars = [...characters];
    const qDroppable = chars.find((e) => +e.id === +draggableId);
    if (qDroppable) {
      chars.splice(source.index, 1);
      chars.splice(destination.index, 0, qDroppable);

      setCharacters(chars);
      saveToLocal("chars", chars);
    }
  };

  const onLoadDoc = (text) => {
    const [characters, important, settings] = text.split("\n");

    localStorage.setItem("chars", characters);
    localStorage.setItem("imp", important);
    localStorage.setItem("settings", settings);

    getAllFromLocal();
  };

  const confirmSettings = (vals) => {
    setVisibleSettings(false);
    setSettings(vals);
    saveToLocal("settings", vals);

    if (vals.enableClors === false) {
      const arr = characters.map((item) => ({ ...item, color: "#ffffff" }));
      setCharacters(arr);
      saveToLocal("chars", arr);
    }
  };

  useEffect(() => {
    getAllFromLocal();
  }, []);

  return (
    <div className="App" ref={setContainerRef}>
      <Space size={16} style={{ marginBottom: 10, padding: "0 30px" }}>
        <Popover
          placement="bottomLeft"
          title="Настройки"
          trigger="click"
          visible={visibleSettings}
          onVisibleChange={setVisibleSettings}
          content={
            visibleSettings && (
              <Settings
                initSetings={settings}
                onConfirmSettings={confirmSettings}
              />
            )
          }
        >
          <SettingTwoTone className="dnd-action_icon" />
        </Popover>

        <TxtDocSaver
          characters={characters}
          important={important}
          settings={settings}
        />
        <TxtDocUploader onLoadDoc={onLoadDoc} />
      </Space>

      <Row gutter={[20, 15]}>
        <Col span={settings.enableClors ? 14 : 12}>
          <div className="flex-col box--gutter15">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="dnd-paddint_top_10">
                      {characters.map((char, index) => (
                        <Draggable
                          key={char.id}
                          draggableId={char.id.toString()}
                          index={index}
                        >
                          {($provided, snapshot) => (
                            <div
                              {...$provided.draggableProps}
                              {...$provided.dragHandleProps}
                              ref={$provided.innerRef}
                            >
                              <div
                                key={char.id}
                                className={c("flex-row gutter_item", {
                                  is_dragging: snapshot.isDragging,
                                })}
                              >
                                <Button
                                  size="small"
                                  onDoubleClick={() => deleteCharacter(char.id)}
                                  onClick={() =>
                                    settings.douleClickForDlete === false &&
                                    deleteCharacter(char.id)
                                  }
                                  style={{
                                    marginRight: 15,
                                    height: 32,
                                  }}
                                >
                                  -
                                </Button>

                                <CharacterInfo
                                  info={char}
                                  haveColors={settings.enableClors}
                                  onSaveInfo={(vals) =>
                                    onCharacterChange({
                                      id: char.id,
                                      el: vals,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              style={{
                width: 260,
                marginTop: 15,
                marginBottom: 15,
              }}
              onClick={addCharacter}
            >
              +
            </Button>
          </div>
        </Col>

        <Col span={settings.enableClors ? 10 : 12}>
          <Affix target={() => containerRef}>
            <div className="dnd-paddint_top_10">
              <TextArea
                value={important}
                placeholder="Другое"
                autoSize={{
                  minRows: 6,
                  maxRows: 30,
                }}
                onChange={(e) => {
                  const val = e.target.value;

                  setImportant(val);
                  saveToLocal("imp", val);
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </div>
  );
}

export default App;
