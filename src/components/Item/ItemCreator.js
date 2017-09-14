import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../../main/actions';
import Item from './Item';
import './styles.css';

const ItemCreator = ({ onAdd }) => {
  let inputField;

  return (
    <Item ElementType='div' className='itemCreator'>
      <p>Add another item...</p>
      <textarea
        ref={(input) => { inputField = input; }}
        className={'itemCreator-input'}
        type="text"
        rows="8"
        placeholder="What do you need to do?"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAdd(inputField.value);
            inputField.value = '';
          }
        }}
      />
      <a onClick={() => {
          inputField.value && onAdd(inputField.value);
          inputField.value = '';
        }} className='icon icono-plusCircle'>&nbsp;</a>
    </Item>
  );
};

ItemCreator.propTypes = {
  onAdd: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAdd: (newItem) => dispatch(addItem(newItem))
});

export default connect(
  null,
  mapDispatchToProps
)(ItemCreator);
