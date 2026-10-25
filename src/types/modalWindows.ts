import type { gameInfo } from "./gameInfo"

export type ModalWindows = {
    modalGameInfo: gameInfo | null,
    isGameCardVisible: boolean,
    isFiltersVisible: boolean,
    isCartVisible: boolean
}