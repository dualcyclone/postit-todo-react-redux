import { expect } from 'chai'
import { addItem, completeItem, removeItem } from '../../../main/store/actions'
import { ADD_ITEM, COMPLETE_ITEM, REMOVE_ITEM } from '../../../main/constants'

describe('Actions', () => {
  describe('addItem', () => {
    it('Will return an action with the correct type, and content', () => {
      const mockContent = 'TESTING123'
      const expected = { type: ADD_ITEM, content: mockContent }

      expect(addItem(mockContent)).to.eql(expected)
    })
  })

  describe('completeItem', () => {
    it('Will return an action with the correct type, and the item', () => {
      const mockItem = { id: 1, content: 'TESTING123', complete: false }
      const expected = { type: COMPLETE_ITEM, item: mockItem }

      expect(completeItem(mockItem)).to.eql(expected)
    })
  })

  describe('removeItem', () => {
    it('Will return an action with the correct type, and the item', () => {
      const mockItem = { id: 1, content: 'TESTING123', complete: false }
      const expected = { type: REMOVE_ITEM, item: mockItem }

      expect(removeItem(mockItem)).to.eql(expected)
    })
  })
})
