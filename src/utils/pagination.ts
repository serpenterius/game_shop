import type { gameInfo } from "../types/gameInfo";

export function pagination(games: gameInfo[], GAMES_ON_PAGE: number, selectedPage: number = 1) {
    const startIndex = (selectedPage * GAMES_ON_PAGE) - GAMES_ON_PAGE;
    const pageContent = games.slice(startIndex, selectedPage * GAMES_ON_PAGE);
    console.log(selectedPage);
    return pageContent

}