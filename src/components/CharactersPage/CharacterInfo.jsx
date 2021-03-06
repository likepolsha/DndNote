import React, { useState } from "react";
import { Col, Input, Row, Form, Button, Popover, Select, Tag } from "antd";
import c from "classnames";
import { CirclePicker } from "react-color";
import { colors } from "../../common/colors";
import { BgColorsOutlined } from "@ant-design/icons";
import TagRender from "../TagRender/TagRender";

const { TextArea } = Input;

export default function CharacterInfo({
  info,
  haveColors,
  tagsList,
  onSaveInfo,
}) {
  const [form] = Form.useForm();
  const [visibleColor, setVisiblColor] = useState(false);

  const styles = {
    background: info.color,
    border:
      info.color === "#ffffff"
        ? "1px solid #d8d8d8"
        : `1px solid ${info.color}`,
  };

  return (
    <Form
      form={form}
      onFinish={(vals) => {
        if (!vals.color) {
          return onSaveInfo({ ...vals, color: info.color });
        }
        return onSaveInfo(vals);
      }}
      initialValues={info}
    >
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <Form.Item name="name" noStyle>
            <TextArea
              className="character-input"
              placeholder="Имя"
              style={styles}
              autoSize={{
                minRows: 1,
                maxRows: 9,
              }}
              onBlur={() => form.submit()}
            />
          </Form.Item>
        </Col>

        <Col span={16}>
          <Form.Item name="info" noStyle>
            <TextArea
              className="character-input"
              placeholder="Информация"
              style={styles}
              autoSize={{
                minRows: 1,
                maxRows: 9,
              }}
              onBlur={() => form.submit()}
            />
          </Form.Item>
        </Col>

        {haveColors && (
          <Col>
            <Popover
              content={
                <Form.Item name="color" normalize={(val) => val.hex} noStyle>
                  <CirclePicker
                    triangle="hide"
                    styles={{
                      boxShadow: "none",
                    }}
                    colors={colors}
                    className="character_color"
                    onChange={() => form.submit()}
                  />
                </Form.Item>
              }
              trigger="click"
              visible={visibleColor}
              onVisibleChange={setVisiblColor}
            >
              <Button
                size="small"
                icon={<BgColorsOutlined />}
                style={{
                  marginLeft: 7,
                  height: 32,
                }}
              />
            </Popover>
          </Col>
        )}

        <Col span={3}>
          <Form.Item name="tags">
            <Select
              mode="multiple"
              placeholder="Теги"
              showArrow
              tagRender={(props) => (
                <TagRender tagsList={tagsList} {...props} />
              )}
              onChange={() => form.submit()}
            >
              {tagsList.map((tag) => (
                <Select.Option key={tag.label} value={tag.label}>
                  <Tag color={tag.color}>{tag.label}</Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
