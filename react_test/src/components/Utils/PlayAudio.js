export const PlayingWord = (audioUrl) => {
    if (audioUrl) {
        new Audio(audioUrl).play();
    }
}