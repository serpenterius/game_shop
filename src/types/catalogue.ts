import type { gameInfo } from "./gameInfo"

export type Catalogue = {
    games: gameInfo[],
    searchQuery: string,
    selectedGenres: string[] | [],
    priceRange: {
        leftPointer: number,
        rightPointer: number
    }
}