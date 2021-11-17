import React, { useState } from "react";
import { Col, Input, Row, Form } from "antd";
import { CirclePicker } from "react-color";
import { colors } from "../../common/colors";

const { TextArea } = Input;

export default function CharacterInfo({ info, haveColors, onSaveInfo }) {
  const [form] = Form.useForm();
  const [localInfo, setLocalInfo] = useState(info);

  const styles = {
    background: info.color,
    border:
      info.color === "#ffffff"
        ? "1px solid #d8d8d8"
        : `1px solid ${info.color}`,
  };

  const onChange = (val, allVals) => {
    setLocalInfo(allVals);
  };

  return (
    <Form
      form={form}
      onFieldsChange={onChange}
      onFinish={onSaveInfo}
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
              onBlur={() => form.submit()}
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
                colors={colors}
                className="character_color"
                onChange={() => form.submit()}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
}
