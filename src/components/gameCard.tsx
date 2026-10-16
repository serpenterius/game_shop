

type Props = {
    title: string,
    price: number,
    img: string,
    id: number,
    openModal: (id: number) => void
}

function GameCard({title, price, img, id, openModal}: Props) {

    return (
        <div onClick={() => openModal(id)} className="game_card">
            <img src={img} alt="" />
            <p>{title}</p>
            <p>{price}$</p>
            <button className='game_buy'>Buy</button>
        </div>
    )
}

export default GameCard 