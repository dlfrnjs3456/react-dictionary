export default async function getWord(searchWord) {
    try {
        //외부 라이브러리를 활용한 단어 검색색
        const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`, {
            cache: "no-store"
        });
        if (!result.ok) {
            //찾을 단어가 없을 경우 에러 처리리
            if (result.status === 404) {
                throw new Error("Word not found. Please check your spelling and try again.")
            }
        }
        return await result.json();
    }
    catch (error) {
        //인터넷 문제 등으로 fetch를 받아오지 못했을 경우 에러 처리
        if (error.name === "TypeError") {
            throw new Error("Failed to fetch");
        }
        throw error;
    }
}