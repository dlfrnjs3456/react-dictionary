import Tabs from './components/Tabs.js'
import SearchWord from './components/SearchWord.js'
import './App.css';

function App() {
  const VocabularyCount = localStorage.getItem("my_vocabulary_cnt") ?? 0;
  const vocabularyLabel = `My Vocabulary (${VocabularyCount})`;
  return (
    <div className="App">
      <div className="headTitle">English Vocabulary Notebook</div>
      <Tabs>
        <div label="Seach Words">
          <SearchWord/>
        </div>
        <div label={vocabularyLabel}>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
