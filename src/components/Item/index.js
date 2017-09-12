import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { completeItem, removeItem } from '../../main/actions';
import './styles.css';

const Item = ({ item, children, onDoneClick, onRemoveClick }) => (
  <li className={ item.completed ? 'complete' : 'todo' }>
    <div style={{ backgroundColor: item.color }}>
      <p>{ children }</p>
      <a onClick={onDoneClick} className="icon icono-cross">&nbsp;</a>
      <a onClick={onDoneClick} className="icon icono-check">&nbsp;</a>
      <a onClick={onRemoveClick} className="icon icono-trash">&nbsp;</a>
    </div>
  </li>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  onDoneClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDoneClick: () => dispatch(completeItem(ownProps.item)),
  onRemoveClick: () => dispatch(removeItem(ownProps.item))
});

export default connect(
  null,
  mapDispatchToProps
)(Item);
