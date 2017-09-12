import { ADD_ITEM, COMPLETE_ITEM, REMOVE_ITEM, TODOLIST_PERSISTANCE } from './constants';
import Item from './Item';

const DEFAULT_STATE = { items: [] };
const PERSISTED_STATE = JSON.parse(localStorage.getItem(TODOLIST_PERSISTANCE));

const initialState = PERSISTED_STATE || DEFAULT_STATE;

const reducer = (state = initialState, action) => {
  let oldItems = state.items;
  let newItems;
  let itemIndex;

  switch (action.type) {
    case ADD_ITEM:
      oldItems = state.items;
      newItems = [
        ...oldItems,
        new Item(oldItems.length, action.content)
      ];

      return Object.assign({}, state, {
        items: newItems
      });

    case COMPLETE_ITEM:
      itemIndex = state.items.indexOf(action.item);
      newItems = [
        ...oldItems.slice(0, itemIndex),
        Object.assign({}, action.item, {
          completed: !action.item.completed
        }),
        ...oldItems.slice(itemIndex + 1)
      ];

      return Object.assign({}, state, {
        items: newItems
      });

    case REMOVE_ITEM:
      itemIndex = state.items.indexOf(action.item);
      newItems = [
        ...oldItems.slice(0, itemIndex),
        ...oldItems.slice(itemIndex + 1)
      ];

      return Object.assign({}, state, {
        items: newItems
      });

    default:
      return state;
  }
};

export default reducer;
