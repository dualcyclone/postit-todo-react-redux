import { TODOLIST_PERSISTANCE } from '../constants'

// persisting the store to localStorage
const enablePersistence = store => store.subscribe(() => {
    localStorage.setItem(
        TODOLIST_PERSISTANCE,
        JSON.stringify(store.getState())
    )
})

export default enablePersistence
