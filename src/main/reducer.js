import { ADD_ITEM, COMPLETE_ITEM, REMOVE_ITEM } from './constants';
import { getInitialState, getNewIndex } from './state';
import Item from './Item';

const reducer = (state = getInitialState(), action) => {
  let oldItems = state.items;
  let newItems;
  let itemIndex;

  switch (action.type) {
    case ADD_ITEM:
      let newIndex = getNewIndex();
      oldItems = state.items;
      newItems = [
        ...oldItems,
        new Item(newIndex, action.content)
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
