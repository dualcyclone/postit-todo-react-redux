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
      <a onClick={onDoneClick} className="icon icono-cross">&nbsp</a>
      <a onClick={onDoneClick} className="icon icono-check">&nbsp</a>
      <a onClick={onRemoveClick} className="icon icono-trash">&nbsp</a>
  </Item>
)

ExistingItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDoneClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDoneClick: () => dispatch(completeItem(ownProps.item)),
  onRemoveClick: () => dispatch(removeItem(ownProps.item))
})

export default connect(
  null,
  mapDispatchToProps
)(ExistingItem)
