import type { gameInfo } from "../types/gameInfo"

import GameCard from "./gameCard"

type Props = {
    games: gameInfo[],
    openModal: (id: number) => void,
    addToCart: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void
}

function GamesList({games, openModal, addToCart}: Props) {

    const gamesCards = games.map(game => {
    return <GameCard key={game.id} title={game.title} price={game.price} img={game.img} id={game.id} openModal={openModal} addToCart={addToCart} />
})


    return (
        <>
            {...gamesCards}
        </>
    )
}

export default GamesList