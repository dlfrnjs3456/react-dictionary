export default async function getWord  (searchWord) {
    const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
    if(result.ok) {
        const data = await result.json();
        return data;
    }
    return null;
}