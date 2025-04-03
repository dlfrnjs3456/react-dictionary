import { HiOutlineSpeakerWave } from "react-icons/hi2";
import {PlayingWord} from './Utils/PlayAudio.js'
import {useEffect} from 'react'

const SearchResult = ({ searchResult, setWordsList, setActiveTab, error, setDisable }) => {
    //searchResult의 경우 json 타입으로 가져오기 때문에
    //audio가 존재하는지 확인 하기 위한 절차
    const audioUrl = searchResult?.[0]?.phonetics?.find(entry => entry.audio)?.audio ?? null;

    useEffect(() => {
        //단어를 검색 중이거나 오류 발생 중일 경우 렌더링 완료 후 버튼 활성화
        if (searchResult || error) {
            setDisable(false);
        }
      }, [searchResult, error, setDisable]);
      
      //내 단어장에 추가할 단어 처리
    const addMyVoca = () => {
        const wordsList = JSON.parse(localStorage.getItem("my-voca")) ?? [];
        //entry형태로 단어가 저장된 json과 저장하는 날짜 처리
        const newEntry = {
          data: searchResult[0],
          date: new Date(),
        };
        //단어 중복 처리 되지 않도록 처리
        if (!wordsList.some(entry => JSON.stringify(entry.data) === JSON.stringify(newEntry.data))) {
          wordsList.push(newEntry);
          //활성화 탭을 내 단어장 탭으로 변경
          setActiveTab(1)
        }
        setWordsList(wordsList);
        localStorage.setItem("my-voca", JSON.stringify(wordsList));
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
                {/** 최대 3개까지의 단어 정보만 출력 */}
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
    {/** 오류 발생할 경우 오류 처리 */}
    {error && (
        <div className="errorBox">
            {error}
        </div>
    )}
    </div>
}

export default SearchResult;