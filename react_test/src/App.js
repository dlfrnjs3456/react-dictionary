import Tabs from './components/Tabs.js'
import SearchWord from './components/SearchWord.js'
import './App.css';
import SearchResult from './components/SearchResult.js';
import React, { useState, useEffect } from 'react';
import AddVocabulary from './components/AddVocabulary.js';

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [wordsList, setWordsList] = useState([]);
  const [vocabularyLabel, setVocabularyLabel] = useState("My Vocabulary (0)");

  useEffect(() => {
    setVocabularyLabel(`My Vocabulary (${wordsList.length})`);
  }, [wordsList]);

  useEffect(() => {
    const storedData = localStorage.getItem("search-result");
    const addWords = localStorage.getItem("my-voca");
    if (storedData) {
      setSearchResult(JSON.parse(storedData));
    }
    if (addWords) {
      setWordsList(JSON.parse(addWords));
    }
  }, []);

  return (
    <div className="App">
      <div className="headTitle">English Vocabulary Notebook</div>
      <Tabs>
        <div label="Seach Words">
          <SearchWord updateResult={setSearchResult} />
          <SearchResult searchResult={searchResult} />
        </div>
        <div label={vocabularyLabel}>
          <AddVocabulary wordsList={wordsList} />
        </div>
      </Tabs>
    </div>
  );
}

export default App;
