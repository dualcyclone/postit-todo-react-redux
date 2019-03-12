import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addItem } from '../../main/store/actions'
import Item from './Item'
import './styles.css'

export class ItemCreator extends Component {
  constructor() {
    super()

    this.state = {
      inputValue: ''
    }

    this.inputField = React.createRef()
  }

  handleAddItem() {
    const { inputValue } = this.state

    if (inputValue) {
      this.props.onAdd(inputValue)
    }

    this.setState({ inputValue: '' })
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  render() {
    return (
      <Item ElementType="div" className="itemCreator">
        <p>Add another item...</p>
        <textarea
          ref={this.inputField}
          className="itemCreator-input"
          type="text"
          rows="8"
          placeholder="What do you need to do?"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              this.handleAddItem()
            }
          }}
          value={this.state.inputValue}
          onChange={evt => this.updateInputValue(evt)}
        />
        <button onClick={() => this.handleAddItem()} className="icon icono-plusCircle">&nbsp</button>
      </Item>
    )
  }
}

ItemCreator.propTypes = {
  onAdd: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onAdd: newItem => dispatch(addItem(newItem))
})

export default connect(
  null,
  mapDispatchToProps
)(ItemCreator)
