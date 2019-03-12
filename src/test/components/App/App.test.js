import React from 'react'
import { expect } from 'chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { App } from '../../../components/App/index'
import ItemCreator from '../../../components/Item/ItemCreator'
import ItemsList from '../../../components/ItemsList'

const jestExpect = global.expect

configure({adapter: new Adapter()})

describe('App', () => {
  it('Should render without failing', () => {
    const renderedItem = shallow(<App />)

    jestExpect(toJson(renderedItem)).toMatchSnapshot()
  })

  it('Should render with the class of "app"', () => {
    const renderedItem = shallow(
      <App />
    )

    expect(renderedItem.is('div')).to.equal(true)
    expect(renderedItem.is('.app')).to.equal(true)
  })

  describe('Should contain the following children', () => {
    let renderedItem

    beforeEach(() => {
      renderedItem = shallow(
        <App />
      )
    })

    it('Contains two children', () => {
      expect(renderedItem.find('div').children().length).to.equal(2)
    })

    it('ItemCreator exists', () => {
      expect(renderedItem.find('div').find(ItemCreator)).not.to.be.undefined
    })

    it('ItemsList exists', () => {
      expect(renderedItem.find('div').find(ItemsList)).not.to.be.undefined
    })
  })
})
