import { HiOutlineSpeakerWave } from "react-icons/hi2";
import {PlayingWord} from './Utils/PlayAudio.js'

const SearchResult = ({ searchResult, setWordsList, setActiveTab, error }) => {
    const audioUrl = searchResult?.[0]?.phonetics?.find(entry => entry.audio)?.audio ?? null;
    debugger
    const addMyVoca = () => {
        const wordsList = JSON.parse(localStorage.getItem("my-voca")) ?? [];
        const newEntry = {
          data: searchResult[0],
          date: new Date(),
        };
    
        if (!wordsList.some(entry => JSON.stringify(entry.data) === JSON.stringify(newEntry.data))) {
          wordsList.push(newEntry);
        }
        setWordsList(wordsList);
        localStorage.setItem("my-voca", JSON.stringify(wordsList));
        setActiveTab(1)
      }
    

    return <div>
    {!error && searchResult && (<div className="resultBox">
        <div className="word">
            {searchResult[0]["word"]}
            {audioUrl && (
                <HiOutlineSpeakerWave className="speaker" onClick={() => PlayingWord(audioUrl)} />
            )}
            <button className="addVoca" onClick={() => addMyVoca()}>+ &nbsp;&nbsp;&nbsp;&nbsp;Add to Vocabulary </button>
        </div>
        <div className="phonetic">
            {searchResult[0]["phonetic"]}
        </div>
        {searchResult?.[0]?.meanings?.map((meaning, index) => (
    <div className="meaningBox" key={index}>
        <div className="POS">
            {meaning.partOfSpeech}
        </div>
        <div className="DEF">
            <ul>
                {meaning.definitions.slice(0, 3).map((def, idx) => (
                    <li key={idx}> 
                        {def.definition}
                        {def.example && (
                            <div className="example" key={`example-${idx}`}>  
                                {`"${def.example}"`}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </div>
))}
    </div>)}
    {error && (
        <div className="errorBox">
            {error}
        </div>
    )}
    </div>
}

export default SearchResult;