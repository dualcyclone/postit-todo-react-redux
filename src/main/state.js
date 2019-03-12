import { TODOLIST_PERSISTANCE } from './constants'

const DEFAULT_STATE = { items: [] }
const PERSISTED_STATE = JSON.parse(localStorage.getItem(TODOLIST_PERSISTANCE))
const INITIAL_STATE = PERSISTED_STATE || DEFAULT_STATE

export const getInitialState = () => {
    return INITIAL_STATE
}
