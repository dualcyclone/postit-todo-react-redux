import { expect } from 'chai';
import Item from '../../../src/main/Item';

describe('Item', () => {
  it('Will create an item with the provided content, id, and default properties defined', () => {
    const mockId = 10;
    const mockContent = 'TESTING123';
    const item = new Item(mockId, mockContent);

    expect(item.id).to.equal(mockId);
    expect(item.content).to.equal(mockContent);
    expect(item.completed).to.equal(false);
    expect(item.color).not.to.be.undefined;
  });
});
