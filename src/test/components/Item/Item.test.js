import React from 'react'
import { expect } from 'chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { Item } from '../../../../src/components/Item/Item'

const jestExpect = global.expect

configure({adapter: new Adapter()})

const defaultProps = {
  className: 'todo',
  children: [
    <p key="1">hello 1</p>,
    <p key="2">hello 2</p>
  ]
}

describe('Item', () => {
  it('Should render without failing', () => {
    const renderedItem = shallow(<Item {...defaultProps} />)

    jestExpect(toJson(renderedItem)).toMatchSnapshot()
  })

  it('Should render with the class of "todoItem"', () => {
    const renderedItem = shallow(
      <Item {...defaultProps} />
    )

    expect(renderedItem.is('.todoItem')).to.equal(true)
  })

  it('Should render with the class of "DEMO" when provided with a className as such', () => {
    const renderedItem = shallow(
      <Item {...defaultProps} className="DEMO"/>
    )

    expect(renderedItem.is('.todoItem.DEMO')).to.equal(true)
  })

  it('Should render as an "li" when no ElementType is provided', () => {
    const renderedItem = shallow(
      <Item {...defaultProps} />
    )

    expect(renderedItem.is('li')).to.equal(true)
  })

  it('Should render as a "div" when the ElementType is "div"', () => {
    const renderedItem = shallow(
      <Item {...defaultProps} ElementType='div'/>
    )

    expect(renderedItem.is('div')).to.equal(true)
  })

  it('Child div should render with a background colour when a valid colour is provided', () => {
    const expectedBackgroundColor = '#456'
    const renderedItem = shallow(
      <Item {...defaultProps} color={ expectedBackgroundColor }/>
    )

    expect(renderedItem.find('div').get(0).props.style.backgroundColor).to.equal(expectedBackgroundColor)
  })

  it('Should render provided children within its own wrapper elements', () => {
    const renderedItem = shallow(
      <Item {...defaultProps} />
    )

    expect(renderedItem.find('div').children().length).to.equal(2)
    expect(renderedItem.find('div').children().get(0)).to.eql(defaultProps.children[0])
    expect(renderedItem.find('div').children().get(1)).to.eql(defaultProps.children[1])
  })
})
