import React, { useEffect, useState } from "react";
import { Col, Row, Input } from "antd";

import "../../index.css";
import { getItemFromLocal, saveToLocal } from "../../functions";
import { store } from "../../common/store";
import Diary from "./Diary";

const { TextArea } = Input;

export default function NotesPage({ refetchTrigger }) {
  const [important, setImportant] = useState("");

  const getFromLocal = () => {
    const $important = getItemFromLocal("imp") || [];
    store.imp = $important;

    setImportant($important);
  };

  useEffect(() => {
    getFromLocal();
  }, [refetchTrigger]);

  return (
    <div className="NotesPage-root">
      <Row gutter={[18, 20]} wrap style={{ height: "100%" }}>
        <Col span={11} style={{ height: "100%" }}>
          <TextArea
            style={{ height: "100%" }}
            value={important}
            placeholder="Введите текст"
            onChange={(e) => {
              const val = e.target.value;

              setImportant(val);
              saveToLocal("imp", val);
            }}
          />
        </Col>
        <Col span={13} className="note_page-right_content">
          <div className="note_page-content_item--large">
            <Diary refetchTrigger={refetchTrigger} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
