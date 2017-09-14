import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ItemsList } from '../../../../src/components/ItemsList/index';
import ExistingItem from '../../../../src/components/Item/ExistingItem';

const defaultProps = {
  items: [],
};

describe('ItemsList', () => {
  it('Should render without failing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('Should not display a ul if there arent any items to render', () => {
    const renderedItem = shallow(
      <ItemsList {...defaultProps} items={[]} />
    );

    expect(renderedItem.find('ul')).to.have.length(0);
  });

  it('Should render ExistingItem components as child components when there are valid items to render', () => {
    const items = [
      { id: 1, content: 'Test 1' },
      { id: 2, content: 'Test 2' }
    ];

    const renderedItem = shallow(
      <ItemsList {...defaultProps} items={items} />
    );
    
    expect(renderedItem.find('ul').children(ExistingItem)).to.have.length(2);
  });
});
