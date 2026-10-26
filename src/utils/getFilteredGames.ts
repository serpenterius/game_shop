import type { gameInfo } from "../types/gameInfo";


export function getFilteredGames(games: gameInfo[], searchQuery: string, selectedGenres: string[]) {
    let gamesList: gameInfo[] = games;

    if(searchQuery.trim()) {
        gamesList = gamesList.filter(item => (item.title.toLowerCase()).startsWith(searchQuery.toLowerCase()) === true);            
    }

    if(selectedGenres.length > 0) {
    gamesList = gamesList.filter(game =>
        game.genres.some(genre =>
            selectedGenres.includes(genre)
        )   
    );
    }

    if(!searchQuery.trim() && selectedGenres.length === 0) {
        gamesList = games;
    }

    return gamesList
}