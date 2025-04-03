import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PlayingWord } from "./Utils/PlayAudio.js"
import { useEffect } from "react"

const AddVocabulary = ({ wordsList, setWordsList, setActiveTab }) => {
    //내 단어장 추가되었는지 삭제 되었는지 확인
    useEffect(() => {
        localStorage.setItem("my-voca", JSON.stringify(wordsList));
    }, [wordsList]);

    //내 단어장에서 단어 삭제 처리 
    const deleteMyVoca = (searchWord) => {
        //같은 단어가 있을 경우 그 단어를 제외하고 새로운 list로 생성
        const updateWordsList = wordsList.filter((e) => e.data !== searchWord);
        setWordsList((wordsList) => wordsList = updateWordsList);
        //현재 탭 유지
        setActiveTab(1);
    }

    return (
        <div className="wordBox">
            {wordsList.map((entry) => {
                const { word, phonetics, phonetic, meanings } = entry.data;
                const audioUrl = phonetics?.find(p => p.audio)?.audio;

                return (
                    <div className="resultBox" key={word}>
                        <div className="word">
                            {word}
                            {audioUrl && (
                                <HiOutlineSpeakerWave
                                    className="speaker"
                                    onClick={() => PlayingWord(audioUrl)}
                                />
                            )}
                            <div className="recycle-box">
                                <RiDeleteBin5Line
                                    className="recycle-bin"
                                    onClick={() => deleteMyVoca(entry.data)}
                                />
                            </div>
                        </div>
                        <div className="phonetic">
                            {phonetic}
                            </div>
                        <div className="POS">
                            {meanings?.[0]?.partOfSpeech}
                            </div>
                        <div className="DEF">
                            {meanings?.[0]?.definitions?.[0]?.definition}
                            </div>
                            {/** 날짜를  yyyy.mm.dd로 처리리 */}
                        <div className="edit-date">
                            Added: {new Date(entry.date).toLocaleDateString("ko-KR").slice(0, -1)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
export default AddVocabulary;