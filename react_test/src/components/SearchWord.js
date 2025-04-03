import React, { useState } from 'react'
import getWord from './DictionaryAPI.js'
import { PiMagnifyingGlassLight } from "react-icons/pi";

const SearchWord = ({ updateResult, setError, isDisabled, setDisable }) => {
    //단어 검색창 
    //disable의 경우 현재 search 버튼의 상태를 결정하기 위한 prop
    const [word, setWord] = useState("");

    const handleWord = async (word) => {
        try {
            //단어 검색 도중 발생할 error 처리리
            setDisable(true);
            setError(null);
            const result = await getWord(word);
            localStorage.setItem("search-result", JSON.stringify(result));
            updateResult(result);
        }
        catch (error) {
            setError(error.message)
        }
    }

    return <div className="inputBox">
        <input type="text" placeholder='Enter a word to search...'
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="serachBox" />
            {/*버튼 비활성화, 활성화에 따른 텍스트 변경*/}
        <button className="searchBtn" onClick={() => handleWord(word)} disabled={isDisabled}> {isDisabled ? "Searching..." : <><PiMagnifyingGlassLight className="glass" /> Search</>}</button>
    </div>
}

export default SearchWord;