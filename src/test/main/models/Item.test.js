import { expect } from 'chai'
import sinon from 'sinon'
import Item from '../../../main/models/Item'

describe('Item', () => {
  let now = Date.now()
  let mockId

  beforeEach(() => {
    sinon.stub(Date, 'now').callsFake(() => now)
    mockId = btoa(now)
  })
  afterEach(() => Date.now.restore())

  it('Will create an item with the provided content, id, and default properties defined', () => {
    const mockContent = 'TESTING123'
    const item = new Item(mockContent)

    expect(item.id).to.equal(mockId)
    expect(item.content).to.equal(mockContent)
    expect(item.completed).to.equal(false)
    expect(item.color).not.to.be.undefined
  })
})
