import type { gameInfo } from "./gameInfo"

export type Catalogue = {
    renderedGames: gameInfo[],
    searchQuery: string,
    selectedGenres: string[] | [],
    maxPrice: number,
    cartList: gameInfo[] | [],
    selectedPage: number
}