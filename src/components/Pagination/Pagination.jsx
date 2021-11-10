import {
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";

export default function Pagination({ currPage, onChangePage, total }) {
  const [inputVal, setInputVal] = useState(total);

  const onPrev = () => {
    if (currPage > 1) {
      onChangePage(currPage - 1);
    }
  };

  const onNext = () => {
    if (currPage < total) {
      onChangePage(currPage + 1);
    }
  };

  const onInputPage = (val) => {
    if (val > total) {
      return onChangePage(total);
    }

    if (val < 1) {
      return onChangePage(1);
    }

    return onChangePage(val);
  };

  useEffect(() => {
    setInputVal(currPage);
  }, [currPage]);

  return (
    <div className="Pagination-root">
      <VerticalRightOutlined
        className="pagination-item"
        onClick={() => onChangePage(1)}
      />
      <LeftOutlined className="pagination-item" onClick={onPrev} />

      <Input
        className="pagination-item"
        size="small"
        style={{ width: 60 }}
        value={inputVal}
        onChange={(e) => {
          const val = e.target.value;
          setInputVal(val);
        }}
        onBlur={(e) => {
          const val = e.target.value;

          onInputPage(+val);
        }}
        onKeyPress={(e) => {
          if (e.which === 13) {
            const val = e.target.value;
            onInputPage(+val);
          }
        }}
      />

      <span className="pagination-item">/</span>

      <span className="pagination-item">{total}</span>

      <RightOutlined className="pagination-item" onClick={onNext} />
      <VerticalLeftOutlined
        className="pagination-item"
        onClick={() => onChangePage(total)}
      />
    </div>
  );
}
