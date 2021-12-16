import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";

import Header from "./components/Header/Header";
import CharactersPage from "./components/CharactersPage/CharactersPage";
import NotesPage from "./components/NotesPage/NotesPage";
import { dispatchToStorage } from "./functions/dispatchToStorage";
import { getItemFromLocal, saveToLocal } from "./functions";

function App() {
  const [page, setPage] = useState(null);
  const [loadTrigger, setLoadTrigger] = useState(false);
  const [tagsList, setTagsList] = useState([]);
  const [searchedTags, setSearchedTags] = useState([]);

  const onLoadDoc = (text) => {
    const [characters, important, diary, tags] = text.split("\n");

    localStorage.setItem("chars", characters);
    localStorage.setItem("imp", important);
    localStorage.setItem("diary", diary);
    localStorage.setItem("tags", tags);

    dispatchToStorage();
    getFromLocal();
    setLoadTrigger((state) => !state);
  };

  const getFromLocal = () => {
    const $page = getItemFromLocal("page") || "characters";
    const $tags = getItemFromLocal("tags") || [];

    setPage($page);
    setTagsList($tags);
  };

  const handleCreateTag = (tag) => {
    const arr = [...tagsList, tag];
    setTagsList(arr);

    saveToLocal("tags", arr);
  };

  const handleDeleteTag = (label) => {
    const arr = [...tagsList];
    const index = arr.findIndex((el) => el.label === label);

    arr.splice(index, 1);

    setTagsList(arr);
    saveToLocal("tags", arr);
  };

  useEffect(() => {
    dispatchToStorage();
    getFromLocal();
  }, []);

  const renderPage = () => {
    let component = null;

    switch (page) {
      case "characters":
        component = (
          <CharactersPage
            tagsList={tagsList}
            refetchTrigger={loadTrigger}
            searchedTags={searchedTags}
          />
        );
        break;
      case "notes":
        component = <NotesPage refetchTrigger={loadTrigger} />;
        break;
      default:
        component = null;
    }

    return <div className="App-content">{component}</div>;
  };

  return (
    <div className="App">
      <Header
        selectedPage={page}
        tagsList={tagsList}
        onSearchTags={setSearchedTags}
        onChangePage={(val) => {
          setPage(val);
          saveToLocal("page", val);
        }}
        onLoadDoc={onLoadDoc}
        onCreateTag={handleCreateTag}
        onDeleteTag={handleDeleteTag}
      />

      {renderPage()}
    </div>
  );
}

export default App;
