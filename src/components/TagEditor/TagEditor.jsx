import React from "react";
import { CirclePicker } from "react-color";
import { colors } from "../../common/colors";
import {
  Modal,
  Form,
  Input,
  Space,
  Divider,
  Tag,
  Row,
  Col,
  Button,
} from "antd";

export default function TagCreater({ tagsList, onCreateTag, onDeleteTag }) {
  const [form] = Form.useForm();

  return (
    <Row gutter={[40, 20]}>
      <Col className="tags_editor-col" span={11}>
        {tagsList.map((tag) => (
          <div style={{ padding: 5 }} key={tag.label}>
            <Tag
              key={tag.label}
              color={tag.color}
              closable
              onClose={() => onDeleteTag(tag.label)}
            >
              {tag.label}
            </Tag>
          </div>
        ))}
      </Col>

      <Col className="tags_editor-col" span={13}>
        <Form
          form={form}
          onFinish={(vals) => {
            onCreateTag(vals);
            form.resetFields();
          }}
          validateMessages={{
            required: "Обязательное поле",
          }}
          validateTrigger="onSubmit"
        >
          <Form.Item
            name="label"
            rules={[
              {
                required: true,
              },
              {
                validator: (_, val) => {
                  const index = tagsList.findIndex((el) => el.label === val);
                  if (index > -1) {
                    return Promise.reject(
                      new Error("тег с таким названием уже существует")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="наименование" />
          </Form.Item>

          <Form.Item
            name="color"
            rules={[
              {
                required: true,
              },
            ]}
            normalize={(val) => val.hex}
          >
            <CirclePicker
              triangle="hide"
              styles={{
                boxShadow: "none",
              }}
              colors={colors}
              className="character_color"
            />
          </Form.Item>

          <Button htmlType="submit">Создать</Button>
        </Form>
      </Col>
    </Row>
  );
}
