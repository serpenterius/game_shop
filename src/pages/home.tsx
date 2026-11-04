import { useState } from 'react'

import '../css/style.css'

import GamesList from '../components/GamesList.tsx'
import ModalPage from '../components/modalPage.tsx'
import ModalFilters from '../components/modalFilters.tsx'
import Cart from '../components/cart.tsx'
import PagesButtons from '../components/PagesButtons.tsx'


import { games } from '../data/games.ts'

import type { gameInfo } from '../types/gameInfo.ts'
import type { Catalogue } from '../types/catalogue.ts'
import type { ModalWindows } from '../types/modalWindows.ts'

import { getFilteredGames } from '../utils/getFilteredGames.ts'
import { pagination } from '../utils/pagination.ts'

import { MAX_PRICE } from '../data/configs.ts'
import { GAMES_ON_PAGE } from '../data/configs.ts'


function HomePage() {
    const [catalogue, setCatalogue] = useState<Catalogue>({
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

    let filteredGames = getFilteredGames(games, catalogue.searchQuery, catalogue.selectedGenres, catalogue.maxPrice);
    let paginationGames = pagination(filteredGames, GAMES_ON_PAGE, catalogue.selectedPage)
    


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
                <input value={catalogue.searchQuery} onChange={(e) => setCatalogue(prev => ({...prev, searchQuery: e.target.value, selectedPage: 1}))} type="text" />
                <button onClick={() => setModalWindows({...modalWindows, isFiltersVisible: !modalWindows.isFiltersVisible})}>Filters</button>

                <ModalFilters isOpen={modalWindows.isFiltersVisible} catalogue={catalogue} setCatalogue={setCatalogue} />
            </div>

            <div className="games">
                {/* {...gamesCards} */}
                <GamesList games={paginationGames} openModal={openModal} addToCart={addToCart} />
            </div>
            
            <div className="pages_buttons">
                <PagesButtons games={filteredGames} GAMES_ON_PAGE={GAMES_ON_PAGE} currentPage={catalogue.selectedPage} setCatalogue={setCatalogue} />
            </div>

            <ModalPage isOpen={modalWindows.isGameCardVisible} gameInfo={modalWindows.modalGameInfo} closeModal={closeModal} addToCart={addToCart} />
        </div>
    )
}

export default HomePage

// Пересмотреть вычисление PAGES.
// Переделал рендер игр на страницу. Теперь пагинация + работающие фильтры + поиск.
// Страницы теперь рассчитываются автоматически.
// Сделал переключение страниц
// Контент показывается на всех страницах нормально.

// Остановился на том, что сделал пагинацию + фильтры + поиск, всё работает нормально.



// Поправить стили у div с кнопками страниц, сделать fixed вниз.

// Обработать сценарий: пользователь ввёл белиберду, 0 страниц найденных игр, 1 из 0 страниц.