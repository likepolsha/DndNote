import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import c from "classnames";

import CharacterInfo from "./CharacterInfo";
import { saveToLocal, getItemFromLocal } from "../../functions";

import "antd/dist/antd.css";
import { store } from "../../common/store";
import { DeleteOutlined, DragOutlined } from "@ant-design/icons";

export default function CharactersPage({
  refetchTrigger,
  tagsList,
  searchedTags,
}) {
  const [characters, setCharacters] = useState([]);

  const getFromLocal = () => {
    const $characters = getItemFromLocal("chars") || [];
    store.chars = $characters;

    setCharacters($characters);
  };

  const addCharacter = () => {
    setCharacters((state) => [
      ...state,
      {
        id: Date.now(),
        name: "",
        info: "",
        color: "#ffffff",
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

  useEffect(() => {
    getFromLocal();
  }, [refetchTrigger]);

  const renderChars = (chars) =>
    chars.map((char, index) => (
      <Draggable key={char.id} draggableId={char.id.toString()} index={index}>
        {($provided, snapshot) => (
          <div {...$provided.draggableProps} ref={$provided.innerRef}>
            <div
              key={char.id}
              className={c("flex-row gutter_item", {
                is_dragging: snapshot.isDragging,
              })}
            >
              <Button
                size="small"
                icon={<DeleteOutlined />}
                onDoubleClick={() => deleteCharacter(char.id)}
                style={{
                  marginRight: 15,
                  height: 32,
                }}
              />

              <div {...$provided.dragHandleProps} style={{ marginRight: 7 }}>
                <Button
                  size="small"
                  icon={<DragOutlined />}
                  style={{
                    height: 32,
                  }}
                />
              </div>

              <CharacterInfo
                info={char}
                haveColors
                tagsList={tagsList}
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
    ));

  return (
    <div className="CharactersPage-root">
      <div className="flex-col box--gutter15">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="dnd-paddint_top_10">
                  {searchedTags.length > 0
                    ? renderChars(
                        characters.filter((item) => {
                          const { tags } = item;
                          let flag = true;

                          searchedTags.forEach((label) => {
                            if (!tags.includes(label)) {
                              flag = false;
                              return;
                            }
                          });

                          return flag;
                        })
                      )
                    : renderChars(characters)}
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
    </div>
  );
}
