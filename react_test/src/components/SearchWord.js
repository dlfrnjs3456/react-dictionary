import React, { useState } from 'react'
import getWord from './DictionaryAPI.js'

const SearchWord = () => {

    const [word, setWord] = useState("");

    console.log(word);

    return <div className="inputBox">
        <input type="text" placeholder='Enter a word to search...' 
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="serachBox" />
        <button className="searchBtn" onClick={() => getWord(word)}>Search</button>
    </div>
}

export default SearchWord;