import { ADD_ITEM, COMPLETE_ITEM, REMOVE_ITEM } from '../constants'

const addItem = content => ({ type: ADD_ITEM, content })
const completeItem = item => ({ type: COMPLETE_ITEM, item })
const removeItem = item => ({ type: REMOVE_ITEM, item })

export { addItem, completeItem, removeItem }
