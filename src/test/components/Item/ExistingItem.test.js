import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { ExistingItem } from '../../../../src/components/Item/ExistingItem'
import Item from '../../../../src/components/Item/Item'

const jestExpect = global.expect

configure({adapter: new Adapter()})

const defaultProps = {
  item: {
    completed: false,
    color: '#456',
    content: 'TEST TODO'
  },
  onDoneClick: sinon.stub(),
  onRemoveClick: sinon.stub()
}

describe('ExistingItem', () => {
  it('Should render without failing', () => {
    const renderedItem = shallow(<ExistingItem {...defaultProps} />)

    jestExpect(toJson(renderedItem)).toMatchSnapshot()
  })

  it('Should render with the class of "todo"', () => {
    const renderedItem = shallow(
      <ExistingItem {...defaultProps} />
    )

    expect(renderedItem.is('.todo')).to.equal(true)
    expect(renderedItem.is('.complete')).to.equal(false)
  })

  it('Should render with the class of "complete" if the item is marked as complete', () => {
    const completedItem = Object.assign({}, defaultProps.item, {
      completed: true
    })
    const propsWithCompleteItem = Object.assign({}, defaultProps, {
      item: completedItem
    })
    const renderedItem = shallow(
      <ExistingItem {...propsWithCompleteItem} />
    )

    expect(renderedItem.is('.todo')).to.equal(false)
    expect(renderedItem.is('.complete')).to.equal(true)
  })

  it('Should implement a single Item', () => {
    const renderedItem = shallow(
      <ExistingItem {...defaultProps} />
    )

    expect(renderedItem.find(Item).length).to.equal(1)
  })

  it('Should provide a colour where one is provided', () => {
    const renderedItem = shallow(
      <ExistingItem {...defaultProps} />
    )

    expect(renderedItem.find(Item).props().color).to.equal(defaultProps.item.color)
  })

  describe('Should contain the following children', () => {
    it('The first implementing child of the component should contain the items content', () => {
      const renderedItem = shallow(
        <ExistingItem {...defaultProps} />
      )

      expect(renderedItem.find(Item).find('p').props().children).to.equal(defaultProps.item.content)
    })

    it('The remaining children should be buttons that implement onDoneClick and onRemoveClick properties (not completed)', () => {
      const renderedItem = shallow(
        <ExistingItem {...defaultProps} />
      )

      expect(renderedItem.find(Item).find('button').get(0).props.className).to.equal('icon icono-check')
      expect(renderedItem.find(Item).find('button').get(0).props.onClick).to.equal(defaultProps.onDoneClick)

      expect(renderedItem.find(Item).find('button').get(1).props.className).to.equal('icon icono-trash')
      expect(renderedItem.find(Item).find('button').get(1).props.onClick).to.equal(defaultProps.onRemoveClick)
    })

    it('The remaining children should be buttons that implement onDoneClick and onRemoveClick properties (completed)', () => {
      const renderedItem = shallow(
        <ExistingItem {...defaultProps} item={{ ...defaultProps.item, completed: true }} />
      )

      expect(renderedItem.find(Item).find('button').get(0).props.className).to.equal('icon icono-cross')
      expect(renderedItem.find(Item).find('button').get(0).props.onClick).to.equal(defaultProps.onDoneClick)

      expect(renderedItem.find(Item).find('button').get(1).props.className).to.equal('icon icono-trash')
      expect(renderedItem.find(Item).find('button').get(1).props.onClick).to.equal(defaultProps.onRemoveClick)
    })
  })
})
