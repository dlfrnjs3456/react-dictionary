import { HiOutlineSpeakerWave } from "react-icons/hi2";

const SearchResult = ({ searchResult }) => {
    const audioUrl = searchResult?.[0]?.phonetics?.find(entry => entry.audio)?.audio ?? null;

    const PlayingWord = () => {
        if (audioUrl) {
            new Audio(audioUrl).play();
        }
    }

    const addMyVoca = () => {
        const wordsList = JSON.parse(localStorage.getItem("my-voca")) ?? [];
    
        const newEntry = {
          data: searchResult[0],
          date: new Date().toISOString()
        };
    
        if (!wordsList.some(entry => JSON.stringify(entry.data) === JSON.stringify(newEntry.data))) {
          wordsList.push(newEntry);
        }
    
        localStorage.setItem("my-voca", JSON.stringify(wordsList));
      }
    

    return searchResult && (<div className="resultBox">
        <div className="word">
            {searchResult[0]["word"]}
            {audioUrl && (
                <HiOutlineSpeakerWave className="speaker" onClick={PlayingWord} />
            )}
            <button className="addVoca" onClick={() => addMyVoca()}>+ &nbsp;&nbsp;&nbsp;&nbsp;Add to Vocabulary </button>
        </div>
        <div className="phonetic">
            {searchResult[0]["phonetic"]}
        </div>
        {searchResult[0].meanings.map((meaning, index) => (
            <div className="meaningBox">
                <div className="POS">
                    {meaning.partOfSpeech}
                </div>
                <div className="DEF">
                    <ul>
                        {meaning.definitions.slice(0, 3).map((def, idx) => (
                            <li key={idx}>{def.definition}
                                <div className="example">
                                    {def.example ? ` "${def.example}"` : ""}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
    </div>)
}

export default SearchResult;