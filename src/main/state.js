import { TODOLIST_PERSISTANCE } from './constants';

const DEFAULT_STATE = { items: [] };
const PERSISTED_STATE = JSON.parse(localStorage.getItem(TODOLIST_PERSISTANCE));
const INITIAL_STATE = PERSISTED_STATE || DEFAULT_STATE;

let ITEM_INDEX = INITIAL_STATE.items.length !== 0 ? Math.max.apply(null, PERSISTED_STATE.items.map(i => i.id)) : 0;

export const getNewIndex = () => {
    ITEM_INDEX += 1;
    return ITEM_INDEX;
};

export const getInitialState = () => {
    return INITIAL_STATE;
}
