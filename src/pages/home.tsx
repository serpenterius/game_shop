import { useState } from 'react'

import '../css/style.css'

import GameCard from '../components/gameCard'
import ModalPage from '../components/modalPage.tsx'
import ModalFilters from '../components/modalFilters.tsx'
import { Cart } from '../components/cart.tsx'

import { games } from '../data/games.ts'
import { genres } from '../data/genres.ts'

import type { gameInfo } from '../types/gameInfo.ts'
import type { Catalogue } from '../types/catalogue.ts'
import type { ModalWindows } from '../types/modalWindows.ts'

import { getFilteredGames } from '../utils/getFilteredGames.ts'


function HomePage() {
    const [catalogue, setCatalogue] = useState<Catalogue>({
        games: games,
        searchQuery: '',
        selectedGenres: [],
        priceRange: {
            leftPointer: 0,
            rightPointer: 0
        },
        cartList: []
    });
    const [modalWindows, setModalWindows] = useState<ModalWindows>({
        modalGameInfo: null,
        isGameCardVisible: false,
        isFiltersVisible: false,
        isCartVisible: false
    });

    const filteredGames = getFilteredGames(catalogue.games, catalogue.searchQuery, catalogue.selectedGenres);

    let gamesCards = filteredGames.map((game, index) => {
        return <GameCard key={index} title={game.title} price={game.price} img={game.img} id={game.id} openModal={openModal} addToCart={addToCart} />
    })

    function addToCart(e: React.MouseEvent<HTMLButtonElement>, id: number) {
        e.stopPropagation();
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
        const game = (catalogue.games).find(game => game.id === id);
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
                <h1>Game Store</h1>
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
                {...gamesCards}
            </div>
            

            <ModalPage isOpen={modalWindows.isGameCardVisible} gameInfo={modalWindows.modalGameInfo} closeModal={closeModal} />
        </div>
    )
}

export default HomePage


// нужно, что бы при наведениее на filters запускалась логика "Если курсор указывает на кнопку filter или окно с фильтрами - не убирать окно с фильтрами". --- СДЕЛАНО (ИЗМЕНЕНО: фильтр открывается по нажатию на кнопку.)

// нужно сделать переключаемые ползунки жанров в окне фильтров --- СДЕЛАНО

// !!! нужно доверстать окно жанров, что бы выглядело приятно

// нужно сделать в окне фильтров раздел с ценами.

// нужно сделать модульную логику фильтрации по имени, жанрам и цене

// При нажатии на Buy, и на саму карточку сделать разную логику.


// Переделать импорт обложек