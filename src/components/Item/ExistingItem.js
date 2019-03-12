import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { completeItem, removeItem } from '../../main/store/actions'
import Item from './Item'
import './styles.css'

export const ExistingItem = ({ item, onDoneClick, onRemoveClick }) => (
  <Item
    className={ item.completed ? 'complete' : 'todo' }
    color={ item.color }>
    <p>{ item.content }</p>
    <button onClick={onDoneClick} className={`icon ${item.completed ? 'icono-cross' : 'icono-check'}`}>&nbsp</button>
    <button onClick={onRemoveClick} className="icon icono-trash">&nbsp</button>
  </Item>
)

ExistingItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDoneClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDoneClick: () => dispatch(completeItem(ownProps.item)),
  onRemoveClick: () => dispatch(removeItem(ownProps.item)),
})

export default connect(
  null,
  mapDispatchToProps
)(ExistingItem)
