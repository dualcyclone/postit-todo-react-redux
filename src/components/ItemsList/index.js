import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExistingItem from '../Item/ExistingItem';
import './styles.css';

const ItemsList = ({ items }) => {
  return (
    <div>
      { items.length > 0 &&
        <ul className={'itemsList-ul'}>
          { items.map(item => (
            <ExistingItem key={item.id} item={item} />
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
