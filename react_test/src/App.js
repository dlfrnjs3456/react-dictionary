import Tabs from './components/Tabs.js'
import SearchWord from './components/SearchWord.js'
import './App.css';
import SearchResult from './components/SearchResult.js';
import React, { useState, useEffect } from 'react';
import AddVocabulary from './components/AddVocabulary.js';

function App() {
  //각 상태 변화를 위한 props
  const [searchResult, setSearchResult] = useState(null);
  const [wordsList, setWordsList] = useState([]);
  const [vocabularyLabel, setVocabularyLabel] = useState("My Vocabulary (0)");
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);
  const [isDisabled, setDisable] = useState(false);

  //내 단어장이 추가되거나 사라질때마다 숫자 업데이트트
  useEffect(() => {
    setVocabularyLabel(`My Vocabulary (${wordsList.length})`);
  }, [wordsList]);
 //검색한 단어와 찾은 단어 데이터를 props에 저장장
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
          {/*활성화 된 탭 */}
          <SearchWord updateResult={setSearchResult} setError={setError} isDisabled={isDisabled} setDisable={setDisable} />
          <SearchResult searchResult={searchResult} setWordsList={setWordsList} setActiveTab={setActiveTab} error={error} setDisable={setDisable}/>
        </div>
        <div label={vocabularyLabel}>
          {/*활성화 된 탭 */}
          <AddVocabulary wordsList={wordsList} setWordsList={setWordsList} setActiveTab={setActiveTab}/>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
