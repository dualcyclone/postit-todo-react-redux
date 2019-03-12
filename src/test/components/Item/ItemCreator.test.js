import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { ItemCreator } from '../../../../src/components/Item/ItemCreator'
import Item from '../../../../src/components/Item/Item'

chai.use(sinonChai)
const jestExpect = global.expect

const defaultProps = {
  onAdd: sinon.stub()
}

configure({adapter: new Adapter()})

describe('ItemCreator', () => {
  it('Should render without failing', () => {
    const renderedItem = shallow(<ItemCreator {...defaultProps} />)

    jestExpect(toJson(renderedItem)).toMatchSnapshot()
  })

  it('Should render with the class of "itemCreator"', () => {
    const renderedItem = shallow(
      <ItemCreator {...defaultProps} />
    )

    expect(renderedItem.is('.itemCreator')).to.equal(true)
  })

  it('Should pass through that the required Item must be of type "div"', () => {
    const renderedItem = shallow(
      <ItemCreator {...defaultProps} />
    )

    expect(renderedItem.find(Item).props().ElementType).to.equal('div')
  })

  describe('Should contain the following children', () => {
    it('"p"', () => {
      const renderedItem = shallow(
        <ItemCreator {...defaultProps} />
      )

      expect(renderedItem.find('p')).not.to.be.undefined
      expect(renderedItem.find('p').props().children).to.equal('Add another item...')
    })

    it('"textarea"', () => {
      const renderedItem = shallow(
        <ItemCreator {...defaultProps} />
      )

      expect(renderedItem.find('textarea')).not.to.be.undefined
      expect(renderedItem.find('textarea').props().placeholder).to.equal('What do you need to do?')
    })

    it('"a"', () => {
      const renderedItem = shallow(
        <ItemCreator {...defaultProps} />
      )

      expect(renderedItem.find('button')).not.to.be.undefined
      expect(renderedItem.find('button').props().className).to.equal('icon icono-plusCircle')
    })
  })

  describe('Should handle the following user initiated events', () => {
    afterEach(() => {
      defaultProps.onAdd.reset()
    })

    it('Pressing enter on the textarea should call the "onAdd" method', () => {
      const renderedItem = shallow(
        <ItemCreator {...defaultProps} />
      )
      const itemCreatorTextArea = renderedItem.find('textarea')
      const mockEvent = {
        key: 'Enter',
        preventDefault: sinon.stub()
      }
      const mockState = { inputValue: 'TEST ITEM' }

      renderedItem.setState(mockState)

      itemCreatorTextArea.props().onKeyPress(mockEvent)

      expect(mockEvent.preventDefault).to.have.been.called
      expect(defaultProps.onAdd).to.have.been.called.and.calledWith(mockState.inputValue)
      expect(renderedItem.state('inputValue')).to.equal('')
    })

    describe('Pressing any other key on the textarea should not call the "onAdd" method', () => {
      it('"p" key', () => {
        const renderedItem = shallow(
          <ItemCreator {...defaultProps} />
        )
        const itemCreatorTextArea = renderedItem.find('textarea')
        const mockEvent = {
          key: 'P',
          preventDefault: sinon.stub()
        }
        const mockState = { inputValue: 'TEST ITEM' }

        renderedItem.setState(mockState)

        itemCreatorTextArea.props().onKeyPress(mockEvent)

        expect(mockEvent.preventDefault).not.to.have.been.called
        expect(defaultProps.onAdd).not.to.have.been.called
        expect(renderedItem.state('inputValue')).to.equal(mockState.inputValue)
      })

      it('"Shift" key', () => {
        const renderedItem = shallow(
          <ItemCreator {...defaultProps} />
        )
        const itemCreatorTextArea = renderedItem.find('textarea')
        const mockEvent = {
          key: 'Shift',
          preventDefault: sinon.stub()
        }
        const mockState = { inputValue: 'TEST ITEM' }

        renderedItem.setState(mockState)

        itemCreatorTextArea.props().onKeyPress(mockEvent)

        expect(mockEvent.preventDefault).not.to.have.been.called
        expect(defaultProps.onAdd).not.to.have.been.called
        expect(renderedItem.state('inputValue')).to.equal(mockState.inputValue)
      })

      it('"Up" key', () => {
        const renderedItem = shallow(
          <ItemCreator {...defaultProps} />
        )
        const itemCreatorTextArea = renderedItem.find('textarea')
        const mockEvent = {
          key: 'Up',
          preventDefault: sinon.stub()
        }
        const mockState = { inputValue: 'TEST ITEM' }

        renderedItem.setState(mockState)

        itemCreatorTextArea.props().onKeyPress(mockEvent)

        expect(mockEvent.preventDefault).not.to.have.been.called
        expect(defaultProps.onAdd).not.to.have.been.called
        expect(renderedItem.state('inputValue')).to.equal(mockState.inputValue)
      })
    })

    it('Clicking on the final anchor tag should call the "onAdd" method', () => {
      const renderedItem = shallow(
        <ItemCreator {...defaultProps} />
      )
      const itemCreatorAnchor = renderedItem.find('button')
      const mockState = { inputValue: 'TEST ITEM' }

      renderedItem.setState(mockState)

      itemCreatorAnchor.props().onClick()

      expect(defaultProps.onAdd).to.have.been.called.and.calledWith(mockState.inputValue)
      expect(renderedItem.state('inputValue')).to.equal('')
    })

    it('Clicking on the final anchor tag should not call the "onAdd" method if there is no input value set', () => {
      const renderedItem = shallow(
        <ItemCreator {...defaultProps} />
      )
      const itemCreatorAnchor = renderedItem.find('button')
      const mockState = { inputValue: '' }

      renderedItem.setState(mockState)

      itemCreatorAnchor.props().onClick()

      expect(defaultProps.onAdd).not.to.have.been.called
    })
  })
})
