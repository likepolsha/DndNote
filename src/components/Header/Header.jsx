import { DeleteTwoTone } from "@ant-design/icons";
import { Col, Row, Menu, Space, Popconfirm } from "antd";
import React from "react";
import { TxtDocSaver } from "../TxtDocs/TxtDocSaver";
import { TxtDocUploader } from "../TxtDocs/TxtDocUploader";

export default function Header({ selectedPage, onChangePage, onLoadDoc }) {
  const onClearAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Row justify="space-between" align="bottom">
      <Col flex={1}>
        <Menu
          onClick={(e) => onChangePage(e.key)}
          selectedKeys={[selectedPage]}
          mode="horizontal"
        >
          <Menu.Item key="characters">Персонажи</Menu.Item>
          <Menu.Item key="notes">Заметки</Menu.Item>
        </Menu>
      </Col>

      <Col
        style={{
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Space size={20} style={{ marginBottom: 10, padding: "0 30px" }}>
          <TxtDocSaver />
          <TxtDocUploader onLoadDoc={onLoadDoc} />
          <Popconfirm
            placement="bottomRight"
            title="Очистить всё?"
            onConfirm={onClearAll}
            okText="Да"
            cancelText="Нет"
          >
            <DeleteTwoTone className="dnd-action_icon" />
          </Popconfirm>
        </Space>
      </Col>
    </Row>
  );
}
