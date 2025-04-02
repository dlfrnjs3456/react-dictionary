import React, { useState } from 'react'
import getWord from './DictionaryAPI.js'
import { PiMagnifyingGlassLight } from "react-icons/pi";

const SearchWord = ({updateResult}) => {

    const [word, setWord] = useState("");
    
    const handleWord = async (word) => {
       const result = await getWord(word);
       localStorage.setItem("search-result", JSON.stringify(result));
       updateResult(result);
    } 

    return <div className="inputBox">
        <input type="text" placeholder='Enter a word to search...' 
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="serachBox" />
        <button className="searchBtn" onClick={() => handleWord(word)}><PiMagnifyingGlassLight className="glass"/>  Search</button>
    </div>
}

export default SearchWord;