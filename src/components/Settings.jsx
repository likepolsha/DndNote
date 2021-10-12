import React from "react";
import { Button, Checkbox, Form, Space } from "antd";

export default function Settings({ initSetings, onConfirmSettings }) {
  return (
    <Form onFinish={onConfirmSettings} initialValues={initSetings}>
      <Space direction="vertical" size={10}>
        <Form.Item name="enableClors" valuePropName="checked" noStyle>
          <Checkbox>Включить цвета</Checkbox>
        </Form.Item>

        <Form.Item name="douleClickForDlete" valuePropName="checked" noStyle>
          <Checkbox>Двойной клик для удаления</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Space>
    </Form>
  );
}
