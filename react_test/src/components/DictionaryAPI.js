export default async function getWord(searchWord) {
    try {
        const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`, {
            cache: "no-store"
        });
        if (!result.ok) {
            if (result.status === 404) {
                throw new Error("Word not found. Please check your spelling and try again.")
            }
        }
        return await result.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            throw new Error("Failed to fetch");
        }
        throw error;
    }
}