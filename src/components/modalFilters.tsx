import type { Dispatch, SetStateAction } from 'react'
import '../css/style.css'

import {genres} from '../data/genres'
import ToggleSwitch from './toggleSwitch'

import type { Catalogue } from '../types/catalogue'

type Props = {
    isOpen: boolean,
    catalogue: Catalogue,
    setCatalogue: Dispatch<SetStateAction<Catalogue>>
}

function ModalFilters({isOpen, catalogue, setCatalogue} : Props) {
    if(!isOpen) return

    const toggleSwitchers = genres.map((item, index) => {
        return (
            <div className='filter_genres_btns'>
                <p key={index}>{item}</p>
                <ToggleSwitch value={catalogue.selectedGenres} genre={item} catalogue={catalogue} setCatalogue={setCatalogue} />
            </div>
        )
    })

    return (
        <div className='modal_filters'>
            <div className="filter_genres">
                {...toggleSwitchers}
            </div>
            <div className="filter_prices">
                <input type="range"
                        min={0}
                        max={300}
                        step={1} />
            </div>
        </div>
    )
}

export default ModalFilters