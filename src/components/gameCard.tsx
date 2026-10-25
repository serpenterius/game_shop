

type Props = {
    title: string,
    price: number,
    img: string,
    id: number,
    openModal: (id: number) => void,
    addToCart: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void
}

function GameCard({title, price, img, id, openModal, addToCart}: Props) {


    return (
        <div onClick={() => openModal(id)} className="game_card">
            <img src={img} alt="" />
            <p>{title}</p>
            <p>{price}$</p>
            <button onClick={(e) => addToCart(e, id)} className='game_buy'>Buy</button>
        </div>
    )
}

export default GameCard 