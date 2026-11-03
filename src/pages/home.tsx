import { useState } from 'react'

import '../css/style.css'

import GamesList from '../components/GamesList.tsx'
import ModalPage from '../components/modalPage.tsx'
import ModalFilters from '../components/modalFilters.tsx'
import Cart from '../components/cart.tsx'


import { games } from '../data/games.ts'

import type { gameInfo } from '../types/gameInfo.ts'
import type { Catalogue } from '../types/catalogue.ts'
import type { ModalWindows } from '../types/modalWindows.ts'

import { pagination } from '../utils/pagination.ts'

import { MAX_PRICE } from '../data/games.ts'
import { PAGES } from '../data/games.ts'

function HomePage() {
    const [catalogue, setCatalogue] = useState<Catalogue>({
        renderedGames: pagination(games, PAGES),
        searchQuery: '',
        selectedGenres: [],
        maxPrice: MAX_PRICE,
        cartList: [],
        selectedPage: 1
    });
    const [modalWindows, setModalWindows] = useState<ModalWindows>({
        modalGameInfo: null,
        isGameCardVisible: false,
        isFiltersVisible: false,
        isCartVisible: false
    });

    // Добавить фильтрацию в рендер.
    // let filteredGames = getFilteredGames(games, catalogue.searchQuery, catalogue.selectedGenres, catalogue.maxPrice);

    function addToCart(e: React.MouseEvent<HTMLButtonElement>, id: number) {
        e.stopPropagation();
        if(catalogue.cartList.find(item => item.id === id)) return

        const gameToCart: gameInfo | undefined = games.find(item => item.id === id);
        if(gameToCart !== undefined) {
            const result: gameInfo[] = [...catalogue.cartList, gameToCart];
            setCatalogue({...catalogue, cartList: result});
        }
    }

    function deleteFromCart(id: number) {
        const filteredData = catalogue.cartList.filter(item => item.id !== id);
        setCatalogue({...catalogue, cartList: filteredData});
    }

    function openModal(id: number) {
        const game = games.find(game => game.id === id);
        if(game) {
            setModalWindows({
                ...modalWindows,
                modalGameInfo: game,
                isGameCardVisible: true
            });
        }
    }

    function closeModal(e: React.MouseEvent) {
        const div = e.target as HTMLDivElement
        if(div.className === 'modal_page') {
            setModalWindows({
                ...modalWindows,
                isGameCardVisible: false
            })
        }
    }

    return (
        <div className='wrapper'>
            <div className="nav">
                <h1>Auflix</h1>
                <button onClick={() => setModalWindows({...modalWindows, isFiltersVisible: false, isCartVisible: !modalWindows.isCartVisible})} className='cart'>Cart</button>

                <Cart isVisible={modalWindows.isCartVisible} cartList={catalogue.cartList} deleteFromCart={deleteFromCart} />
            </div>

            <div className="search">
                {/* <input onChange={(e) => searchGame(e, games)} type="text" /> */}
                <input value={catalogue.searchQuery} onChange={(e) => setCatalogue({...catalogue, searchQuery: e.target.value})} type="text" />
                <button onClick={() => setModalWindows({...modalWindows, isFiltersVisible: !modalWindows.isFiltersVisible})}>Filters</button>

                <ModalFilters isOpen={modalWindows.isFiltersVisible} catalogue={catalogue} setCatalogue={setCatalogue} />
            </div>

            <div className="games">
                {/* {...gamesCards} */}
                <GamesList games={catalogue.renderedGames} openModal={openModal} addToCart={addToCart} />
            </div>
            
            <div className="pages_buttons">
                <button className={catalogue.selectedPage === 1 ? 'page_button' : 'page_button visible'} 
                        onClick={() => setCatalogue(prev => ({...prev, renderedGames: pagination(games, PAGES, catalogue.selectedPage - 1), selectedPage: catalogue.selectedPage - 1}))}>Prev</button>
                <p>{catalogue.selectedPage} из {PAGES}</p>
                <button className={catalogue.selectedPage === PAGES ? 'page_button' : 'page_button visible'} 
                        onClick={() => setCatalogue(prev => ({...prev, renderedGames: pagination(games, PAGES, catalogue.selectedPage + 1), selectedPage: catalogue.selectedPage + 1}))}>Next</button>
            </div>

            <ModalPage isOpen={modalWindows.isGameCardVisible} gameInfo={modalWindows.modalGameInfo} closeModal={closeModal} addToCart={addToCart} />
        </div>
    )
}

export default HomePage

