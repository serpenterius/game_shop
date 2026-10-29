import type { gameInfo } from "../types/gameInfo"

type Props = {
    isVisible: boolean,
    cartList: gameInfo[] | [],
    deleteFromCart: (id: number) => void
}

export function Cart({isVisible, cartList, deleteFromCart}: Props) {
    if(!isVisible) return null

    const gameList = cartList.map(item => {
        return <div key={item.id} className="cart_game">
            <p>{item.title}</p>
            <p>{item.price}$</p>
            <button onClick={() => deleteFromCart(item.id)}>X</button>
        </div>
    })

    return (
        <div className='cart_modal'>
            {...gameList}
        </div>
    )
}