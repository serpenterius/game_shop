import { useState, type Dispatch, type SetStateAction } from "react"

import type { Catalogue } from "../types/catalogue";

type Props = {
    value: string[],
    genre: string,
    catalogue: Catalogue;
    setCatalogue: Dispatch<SetStateAction<Catalogue>>
}

function ToggleSwitch({value, genre, catalogue, setCatalogue}: Props) {

    const name = genre.toLowerCase();
    const isChecked = value.includes(name);

    function handleToggle() {
        if(isChecked) {
            setCatalogue({
                ...catalogue,
                selectedGenres: catalogue.selectedGenres.filter(item => item !== name)
            })
        } else {
            setCatalogue({
                ...catalogue,
                selectedGenres: [...catalogue.selectedGenres, name]
            })
        }
    }

    return (
        <label className="toggle">
            <input type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleToggle()}/>
            <span className="slider"></span>
        </label>
    )
}

export default ToggleSwitch



