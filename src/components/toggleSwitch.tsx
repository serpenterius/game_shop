import { useState, type Dispatch, type SetStateAction } from "react"

import type { Catalogue } from "../types/catalogue";

type Props = {
    genre: string,
    catalogue: Catalogue;
    setCatalogue: Dispatch<SetStateAction<Catalogue>>
}

function ToggleSwitch({genre, catalogue, setCatalogue}: Props) {
    const [isChecked, setIsChecked] = useState(false);

    function handleToggle(checkboxBoolean: boolean, genre: string) {
        let genres: string[] = catalogue.selectedGenres;
        setIsChecked(checkboxBoolean);

        if(checkboxBoolean) {
            genres.push(genre.toLowerCase());
            setCatalogue({...catalogue, selectedGenres: genres})
        } else {
            genres = genres.filter(item => genre.toLowerCase() !== item);
            setCatalogue({...catalogue, selectedGenres: genres})
        }
    }

    return (
        <label className="toggle">
            <input type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleToggle(e.target.checked, genre)}/>
            <span className="slider"></span>
        </label>
    )
}

export default ToggleSwitch



