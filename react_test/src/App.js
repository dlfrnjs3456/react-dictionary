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
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);

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
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <div label="Search Words">
          <SearchWord updateResult={setSearchResult} setError={setError} />
          <SearchResult searchResult={searchResult} setWordsList={setWordsList} setActiveTab={setActiveTab} error={error}/>
        </div>
        <div label={vocabularyLabel}>
          <AddVocabulary wordsList={wordsList} setWordsList={setWordsList} setActiveTab={setActiveTab}/>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
