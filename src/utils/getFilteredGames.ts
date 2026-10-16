import type { gameInfo } from "../types/gameInfo";

import GameCard from "../components/gameCard";

export function getFilteredGames(games: gameInfo[], searchQuery: string, selectedGenres: string[]) {
    let gamesList: gameInfo[] = [];

    if(searchQuery.trim()) {
        gamesList = games.filter(item => (item.title.toLowerCase()).startsWith(searchQuery.toLowerCase()) === true);            
    }

    if(selectedGenres.length > 0) {
    gamesList = games.filter(game =>
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