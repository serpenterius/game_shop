import '../css/style.css'

import type { gameInfo } from '../types/gameInfo';

type Props = {
    isOpen: boolean,
    gameInfo: gameInfo | null,
    closeModal: (e: React.MouseEvent) => void
}

function ModalPage({isOpen, gameInfo, closeModal}: Props) {

    if(!isOpen) return


    return (
        <div onClick={(e) => closeModal(e)} className="modal_page">
            <div className="modal_page_content">
                <img className='modal_page_img' src={gameInfo!.img} alt="" />

                <div className="modal_page_info">
                    <h3>{gameInfo!.title}</h3>
                    <p>{gameInfo!.description}</p>
                    <div className="modal_page_commercial">
                        <p>{gameInfo!.price}$</p>
                        <button>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPage