import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from '../Item';
import './styles.css';

const ItemsList = ({ items }) => {
  return (
    <div>
      { items.length === 0 &&
        <p id={'items-missing'}>
          Add some tasks above.
        </p>
      }
      { items.length > 0 &&
        <ul className={'itemsList-ul'}>
          { items.map(item => (
            <Item key={item.id} item={item}>{ item.content }</Item>
          )) }
        </ul>
      }
    </div>
  );
}

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.items
  };
};

export default connect(
  mapStateToProps
)(ItemsList);
