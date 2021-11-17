import { Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getItemFromLocal, saveToLocal } from "../../functions";
import { store } from "../../common/store";
import Pagination from "../Pagination/Pagination";
import DiaryPage from "./DiaryPage";

const defaultDiaryEl = {
  title: "Заголовок 1",
  text: "",
};

export default function Diary({ refetchTrigger }) {
  const [diary, setDiary] = useState([defaultDiaryEl]);
  const [currPage, setCurrPage] = useState(diary.length);
  const [total, setTotal] = useState(diary.length);

  const getFromLocal = () => {
    const $diary = getItemFromLocal("diary") || [
      {
        title: "Заголовок 1",
        text: "",
      },
    ];
    store.diary = $diary;

    let $currPage = getItemFromLocal("currPage") || $diary.length;

    if ($currPage > $diary.length) {
      $currPage = $diary.length;
    }

    setDiary($diary);
    setTotal($diary.length);
    setCurrPage($currPage);
  };

  const onChangeDiary = (val) => {
    const $diary = [...diary];
    $diary.splice(currPage - 1, 1, val);

    setDiary($diary);
    setTotal($diary.length);
    saveToLocal("diary", $diary);
  };

  const onAddDiaryPage = () => {
    const $diary = [...diary];
    $diary.push({
      title: `Заголовок ${currPage + 1}`,
      text: "",
    });

    setDiary($diary);
    setTotal($diary.length);
    setCurrPage($diary.length);
    saveToLocal("diary", $diary);
  };

  const onDeleteDiaryPage = () => {
    const $diary = [...diary];
    if ($diary.length === 1) {
      setDiary([defaultDiaryEl]);
      return saveToLocal("diary", [defaultDiaryEl]);
    }

    $diary.splice(currPage - 1, 1);

    setDiary($diary);
    setTotal($diary.length);
    setCurrPage((state) => {
      if (state > 1) {
        return state - 1;
      }
      return 1;
    });
    saveToLocal("diary", $diary);
  };

  useEffect(() => {
    getFromLocal();
  }, [refetchTrigger]);

  useEffect(() => {
    saveToLocal("currPage", currPage);
  }, [currPage]);

  return (
    <div className="Diary-root">
      <DiaryPage
        {...diary[currPage - 1]}
        diaryArr={diary}
        currPage={currPage}
        onChangePage={setCurrPage}
        onChange={onChangeDiary}
      />

      <Space size={27}>
        <Pagination
          currPage={currPage}
          onChangePage={setCurrPage}
          total={total}
        />

        <Space size={12}>
          <Button size="small" onClick={onAddDiaryPage} style={{ width: 25 }}>
            +
          </Button>
          <Button
            size="small"
            onClick={onDeleteDiaryPage}
            style={{ width: 25 }}
          >
            -
          </Button>
        </Space>
      </Space>
    </div>
  );
}
