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

  const onLoadDoc = (text) => {
    const [characters, important, diary] = text.split("\n");

    localStorage.setItem("chars", characters);
    localStorage.setItem("imp", important);
    localStorage.setItem("diary", diary);

    dispatchToStorage();
    setLoadTrigger((state) => !state);
  };

  const getFromLocal = () => {
    const $page = getItemFromLocal("page") || "characters";

    setPage($page);
  };

  useEffect(() => {
    dispatchToStorage();
    getFromLocal();
  }, []);

  const renderPage = () => {
    let component = null;

    switch (page) {
      case "characters":
        component = <CharactersPage refetchTrigger={loadTrigger} />;
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
        onChangePage={(val) => {
          setPage(val);
          saveToLocal("page", val);
        }}
        onLoadDoc={onLoadDoc}
      />

      {renderPage()}
    </div>
  );
}

export default App;
