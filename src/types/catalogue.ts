import type { gameInfo } from "./gameInfo"

export type Catalogue = {
    searchQuery: string,
    selectedGenres: string[] | [],
    maxPrice: number,
    cartList: gameInfo[] | []
}