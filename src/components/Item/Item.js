import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Item = ({ ElementType = 'li', color, children, className }) => (
  <ElementType className={ 'todoItem ' + className }>
    <div style={{ backgroundColor: color }}>
      { children }
    </div>
  </ElementType>
);

Item.propTypes = {
  className: PropTypes.string.isRequired, 
  children: PropTypes.array.isRequired
};

export default Item;
