import { games } from "./games";


export const GAMES_ON_PAGE = 9;
export const MAX_PRICE = Math.ceil(Math.max(...games.map(game => game.price)));
