import React from "react";
import { Col, Input, Row, Form } from "antd";
import { CirclePicker } from "react-color";

const { TextArea } = Input;

export default function CharacterInfo({ info, haveColors, onSaveInfo }) {
  const [form] = Form.useForm();

  const styles = {
    background: info.color,
    border:
      info.color === "#ffffff"
        ? "1px solid #d8d8d8"
        : `1px solid ${info.color}`,
  };

  const onChange = () => {
    const vals = form.getFieldsValue();

    onSaveInfo(vals);
  };

  return (
    <Form form={form} onFieldsChange={onChange} initialValues={info}>
      <Row gutter={[6, 6]}>
        <Col span={haveColors ? 5 : 6}>
          <Form.Item name="name" noStyle>
            <TextArea
              className="character-input"
              placeholder="Имя"
              style={styles}
              autoSize={{
                minRows: 1,
                maxRows: 9,
              }}
            />
          </Form.Item>
        </Col>

        <Col span={haveColors ? 12 : 18}>
          <Form.Item name="info" noStyle>
            <TextArea
              className="character-input"
              placeholder="Информация"
              style={styles}
              autoSize={{
                minRows: 1,
                maxRows: 9,
              }}
            />
          </Form.Item>
        </Col>

        {haveColors && (
          <Col>
            <Form.Item name="color" normalize={(val) => val.hex} noStyle>
              <CirclePicker
                triangle="hide"
                styles={{
                  boxShadow: "none",
                }}
                colors={[
                  "#DFF0FF", // синий
                  "#FFD0D0", // красный
                  "#DFFFE3", // зеленый
                  "#FBFFC6", // желтый
                  "#CDB9FF", // сиреневый
                  "#ffffff", // белый
                ]}
                className="character_color"
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
}
