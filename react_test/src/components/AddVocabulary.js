import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PlayingWord } from "./Utils/PlayAudio.js"
import { useEffect } from "react"

const AddVocabulary = ({ wordsList, setWordsList, setActiveTab }) => {

    useEffect(() => {
        localStorage.setItem("my-voca", JSON.stringify(wordsList));
    }, [wordsList]);


    const deleteMyVoca = (searchWord) => {
        const updateWordsList = wordsList.filter((e) => e.data !== searchWord);
        setWordsList((wordsList) => wordsList = updateWordsList);
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