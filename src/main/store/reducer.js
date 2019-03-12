import { ADD_ITEM, COMPLETE_ITEM, REMOVE_ITEM, TODOLIST_PERSISTANCE } from '../constants'
import Item from '../models/Item'

const DEFAULT_STATE = { items: [] }
const PERSISTED_STATE = JSON.parse(localStorage.getItem(TODOLIST_PERSISTANCE))

const initialState = PERSISTED_STATE || DEFAULT_STATE

const reducer = (state = initialState, action) => {
  const { type, item, content } = action
  let oldItems = state.items
  let newItems
  let itemIndex

  switch (type) {
    case ADD_ITEM:
      newItems = [
        ...oldItems,
        new Item(content)
      ]
      break

    case COMPLETE_ITEM:
      itemIndex = state.items.indexOf(item)
      newItems = [
        ...oldItems.slice(0, itemIndex),
        {
          ...item,
          completed: !item.completed
        },
        ...oldItems.slice(itemIndex + 1)
      ]
      break

    case REMOVE_ITEM:
      itemIndex = state.items.indexOf(item)
      newItems = [
        ...oldItems.slice(0, itemIndex),
        ...oldItems.slice(itemIndex + 1)
      ]
      break

    default:
      return state
  }

  return {
    ...state,
    items: newItems
  }
}

export default reducer
