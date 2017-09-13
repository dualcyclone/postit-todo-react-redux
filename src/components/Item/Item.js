import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Item = ({ item, children }) => (
  <li className={ (item.completed ? 'complete' : 'todo') }>
    <div style={{ backgroundColor: item.color }}>
      { children }
    </div>
  </li>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired
};

export default Item;
