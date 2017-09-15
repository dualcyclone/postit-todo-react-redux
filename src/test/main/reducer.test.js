import sinon from 'sinon';
import jest from 'jest';
import { expect } from 'chai';
import { ADD_ITEM, COMPLETE_ITEM, REMOVE_ITEM, ITEM_INDEX } from '../../../src/main/constants';
import * as Item from '../../../src/main/Item';

const statePersistanceLoc = '../../../src/main/state';
const reducerLoc = '../../../src/main/reducer';

describe('reducer', () => {
  describe('Running reducers without persisted values', () => {
    let reducer;
    let statePersistance;

    describe(ADD_ITEM, () => {
      beforeEach(() => {
        let mockIndex = 0;

        global.localStorage = {};
        global.localStorage.getItem = sinon.stub().returns(null);

        // Stubbing Item creation to remove random colour generation
        sinon.stub(Item, 'default').callsFake((id, content) => ({id, content}));
        
        statePersistance = require(statePersistanceLoc);
        sinon.stub(statePersistance, 'getInitialState').returns({ items: [] });
        sinon.stub(statePersistance, 'getNewIndex').callsFake(() => mockIndex += 1);

        // Now require in the module so it picks up the stub above
        reducer = require(reducerLoc).default;
      });
        
      afterEach(() => {
        delete global.localStorage;

        Item.default.restore();
        statePersistance.getInitialState.restore();
        statePersistance.getNewIndex.restore();
      });
    
      it('Expect an initial run to add the first item, and the index to be "1"', () => {
        const mockAction = {
          type: ADD_ITEM,
          content: 'TESTING123'
        };
        const expected = {
          items: [
            { id: 1, content: mockAction.content }
          ]
        };

        expect(reducer(undefined, mockAction)).to.eql(expected)
      });

      it('Adding multiple items, the IDs for each item should be sequential', () => {
        const mockAction = {
          type: ADD_ITEM,
          content: 'TESTING123'
        };
        const expected = {
          items: [
            { id: 1, content: mockAction.content },
            { id: 2, content: mockAction.content }
          ]
        };

        const initialState = reducer(undefined, mockAction);
        expect(reducer(initialState, mockAction)).to.eql(expected)
      });

      it('Will add a new Item to a state that has been revived from persistance', () => {
        statePersistance.getInitialState.restore();
        statePersistance.getNewIndex.restore();

        let mockInitialIndex = 2;
        const mockAction = {
          type: ADD_ITEM,
          content: 'TESTING345'
        };
        const mockInitialState = {
          items: [
            { id: 1, content: 'TESTING123' },
            { id: mockInitialIndex, content: 'TESTING234' }
          ]
        };
        const expected = {
            items: mockInitialState.items.slice(0)
        };
        expected.items.push({
            id: mockInitialIndex + 1,
            content: mockAction.content
        });

        sinon.stub(statePersistance, 'getInitialState').returns(mockInitialState);
        sinon.stub(statePersistance, 'getNewIndex').callsFake(() => mockInitialIndex += 1);

        expect(reducer(mockInitialState, mockAction)).to.eql(expected)
      });
    });

    describe(COMPLETE_ITEM, () => {
      beforeEach(() => {
        global.localStorage = {};
        global.localStorage.getItem = sinon.stub().returns(null);

        // Now require in the module so it picks up the stub above
        reducer = require(reducerLoc).default;
      });
        
      afterEach(() => {
        delete global.localStorage;
      });

      it('Will mark an uncompleted item as completed', () => {
        const mockInitialState = {
          items: [
            { id: 1, content: 'TESTING123', completed: false },
            { id: 2, content: 'TESTING234', completed: false }
          ]
        };
        const expected = {
          items: [
            { id: 1, content: 'TESTING123', completed: false },
            { id: 2, content: 'TESTING234', completed: true }
          ]
        };
        const mockAction = {
          type: COMPLETE_ITEM,
          item: mockInitialState.items[1]
        };

        expect(reducer(mockInitialState, mockAction)).to.eql(expected);
      });

      it('Will mark an completed item as uncompleted', () => {
        const mockInitialState = {
          items: [
            { id: 1, content: 'TESTING123', completed: true },
            { id: 2, content: 'TESTING234', completed: false }
          ]
        };
        const expected = {
          items: [
            { id: 1, content: 'TESTING123', completed: false },
            { id: 2, content: 'TESTING234', completed: false }
          ]
        };
        const mockAction = {
          type: COMPLETE_ITEM,
          item: mockInitialState.items[0]
        };

        expect(reducer(mockInitialState, mockAction)).to.eql(expected);
      });
    });

    describe(REMOVE_ITEM, () => {
      beforeEach(() => {
        global.localStorage = {};
        global.localStorage.getItem = sinon.stub().returns(null);

        // Now require in the module so it picks up the stub above
        reducer = require(reducerLoc).default;
      });
        
      afterEach(() => {
        delete global.localStorage;
      });

      it('Will mark an uncompleted item as completed', () => {
        const mockInitialState = {
          items: [
            { id: 1, content: 'TESTING123', completed: false },
            { id: 2, content: 'TESTING234', completed: false }
          ]
        };
        const expected = {
          items: [
            { id: 1, content: 'TESTING123', completed: false }
          ]
        };
        const mockAction = {
          type: REMOVE_ITEM,
          item: mockInitialState.items[1]
        };

        expect(reducer(mockInitialState, mockAction)).to.eql(expected);
      });
    });

    describe('UNHANDLED ACTION', () => {
      beforeEach(() => {
        global.localStorage = {};
        global.localStorage.getItem = sinon.stub().returns(null);

        // Now require in the module so it picks up the stub above
        reducer = require(reducerLoc).default;
      });
        
      afterEach(() => {
        delete global.localStorage;
      });
      
      it('Will return the initial state unmodified when an unknown action type is sent', () => {
        const mockInitialState = {
          items: [
            { id: 1, content: 'TESTING123', completed: false },
            { id: 2, content: 'TESTING234', completed: false }
          ]
        };
        const mockAction = {
          type: 'UNKNOWN_ACTION',
          item: mockInitialState.items[1]
        };
  
        expect(reducer(mockInitialState, mockAction)).to.eql(mockInitialState);
      })
    })
  });
});
