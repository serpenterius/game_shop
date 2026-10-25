import type { gameInfo } from "../types/gameInfo"

type Props = {
    isVisible: boolean,
    cartList: gameInfo[] | [],
    deleteFromCart: (id: number) => void
}

export function Cart({isVisible, cartList, deleteFromCart}: Props) {
    if(!isVisible) return null

    let result = cartList.map(item => {
        return <div key={Math.random()} className="cart_game">
            <p>{item.title}</p>
            <p>{item.price}$</p>
            <button onClick={() => deleteFromCart(item.id)}>X</button>
        </div>
    })

    return (
        <div className='cart_modal'>
            {...result}
        </div>
    )
}