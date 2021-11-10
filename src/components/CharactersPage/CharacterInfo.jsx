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
            />
          </Form.Item>
        </Col>

        <Col span={14}>
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
                  "#FFD0D0", // красный
                  "#FFF3C6", // оранжевый
                  "#FBFFC6", // желтый
                  "#DFFFE3", // зеленый
                  "#DFFBFF", // голубой
                  "#DFF0FF", // синий
                  "#CDB9FF", // сиреневый
                  "#FDDFFF", // розовый
                  "#EFEFEF", // серый
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
