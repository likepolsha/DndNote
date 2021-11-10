import { Col, Row, Menu, Space } from "antd";
import React from "react";
import { TxtDocSaver } from "../TxtDocs/TxtDocSaver";
import { TxtDocUploader } from "../TxtDocs/TxtDocUploader";

export default function Header({ selectedPage, onChangePage, onLoadDoc }) {
  return (
    <Row justify="space-between" align="bottom">
      <Col flex={1}>
        <Menu
          onClick={(e) => onChangePage(e.key)}
          selectedKeys={[selectedPage]}
          mode="horizontal"
        >
          <Menu.Item key="characters">Персонажи</Menu.Item>
          <Menu.Item key="notes">Заметки и дневник</Menu.Item>
        </Menu>
      </Col>

      <Col>
        <Space size={16} style={{ marginBottom: 10, padding: "0 30px" }}>
          <TxtDocSaver />
          <TxtDocUploader onLoadDoc={onLoadDoc} />
        </Space>
      </Col>
    </Row>
  );
}
