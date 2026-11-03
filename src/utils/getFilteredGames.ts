import type { gameInfo } from "../types/gameInfo";


export function getFilteredGames(games: gameInfo[], searchQuery: string, selectedGenres: string[], maxPrice: number) {
    let gamesList: gameInfo[] = games;
    
    gamesList = gamesList.filter(game => game.price <= maxPrice);

    if(searchQuery.trim()) {
        gamesList = gamesList.filter(game => (game.title.toLowerCase()).includes(searchQuery.toLowerCase()));
    }

    if(selectedGenres.length > 0) {
        gamesList = gamesList.filter(game =>
            game.genres.some(genre =>
                selectedGenres.includes(genre)
            )   
        );
    }    
    return gamesList
}