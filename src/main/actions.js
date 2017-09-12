import { ADD_ITEM, COMPLETE_ITEM, REMOVE_ITEM } from './constants';

export function addItem(content) {
  return { type: ADD_ITEM, content };
}

export function completeItem(item) {
  return { type: COMPLETE_ITEM, item };
}

export function removeItem(item) {
  return { type: REMOVE_ITEM, item };
}
