import { DeleteTwoTone } from "@ant-design/icons";
import {
  Col,
  Row,
  Menu,
  Space,
  Popconfirm,
  Button,
  Select,
  Tag,
  Modal,
} from "antd";
import React, { useState } from "react";
import TagEditor from "../TagEditor/TagEditor";
import TagRender from "../TagRender/TagRender";
import { TxtDocSaver } from "../TxtDocs/TxtDocSaver";
import { TxtDocUploader } from "../TxtDocs/TxtDocUploader";

export default function Header({
  selectedPage,
  tagsList,
  onSearchTags,
  onChangePage,
  onLoadDoc,
  onCreateTag,
  onDeleteTag,
}) {
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [localTags, setLocalTags] = useState([]);

  const onClearAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  const onSelectTag = (tag) => {
    setLocalTags((state) => [...state, tag]);
  };

  const onDeselectTag = (tag) => {
    const arr = [...localTags];
    const index = arr.indexOf(tag);

    if (index > -1) {
      arr.splice(index, 1);
    }

    setLocalTags(arr);
  };

  return (
    <Row align="middle" justify="space-between" gutter={[50, 30]}>
      <Col span={6}>
        <Menu
          onClick={(e) => onChangePage(e.key)}
          selectedKeys={[selectedPage]}
          mode="horizontal"
        >
          <Menu.Item key="characters">Персонажи</Menu.Item>
          <Menu.Item key="notes">Заметки</Menu.Item>
        </Menu>
      </Col>

      <Col span={12}>
        {selectedPage === "characters" ? (
          <Space size={5}>
            <Select
              mode="multiple"
              placeholder="Поиск по тегам"
              showArrow
              tagRender={(props) => (
                <TagRender tagsList={tagsList} {...props} />
              )}
              value={localTags}
              style={{ width: 300 }}
              onSelect={onSelectTag}
              onDeselect={onDeselectTag}
            >
              {tagsList.map((tag) => (
                <Select.Option key={tag.label} value={tag.label}>
                  <Tag color={tag.color}>{tag.label}</Tag>
                </Select.Option>
              ))}
            </Select>

            <Button onClick={() => onSearchTags(localTags)}>Найти</Button>
          </Space>
        ) : null}
      </Col>

      <Col>
        <Modal
          width={600}
          footer={null}
          visible={tagModalVisible}
          title="Редактор тегов"
          onCancel={() => setTagModalVisible(false)}
          destroyOnClose
        >
          <TagEditor
            tagsList={tagsList}
            onCreateTag={onCreateTag}
            onDeleteTag={onDeleteTag}
          />
        </Modal>
        <Button onClick={() => setTagModalVisible(true)}>Редактор тегов</Button>
      </Col>

      <Col>
        <Space size={20} style={{ padding: "0 30px" }}>
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
