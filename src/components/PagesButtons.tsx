import type { gameInfo } from "../types/gameInfo"
import type { Catalogue } from "../types/catalogue";
import type { Dispatch, SetStateAction } from "react";

type Props = {
    games: gameInfo[],
    GAMES_ON_PAGE: number,
    currentPage: number,
    setCatalogue: Dispatch<SetStateAction<Catalogue>>
}

function PagesButtons({games, GAMES_ON_PAGE, currentPage, setCatalogue}: Props) {
    const pages = Math.ceil(games.length / GAMES_ON_PAGE);

    function changePage(option: string) {

        if(option === 'prev' && currentPage === 1 || option === 'next' && currentPage === pages) return

        if(option === 'next') {
            setCatalogue(prev => ({...prev, selectedPage: currentPage + 1}));
        } else {
            setCatalogue(prev => ({...prev, selectedPage: currentPage - 1}));
        }
    }

    return (
        <>
            <button onClick={() => changePage('prev')} className="page_button visible">Prev</button>
            <p>{currentPage} из {pages}</p>
            <button onClick={() => changePage('next')} className="page_button visible">Next</button>
        </>
    )
}

export default PagesButtons