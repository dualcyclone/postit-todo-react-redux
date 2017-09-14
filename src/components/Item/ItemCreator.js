import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../../main/actions';
import Item from './Item';
import './styles.css';

export class ItemCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  render() {
    return (
      <Item ElementType='div' className='itemCreator'>
        <p>Add another item...</p>
        <textarea
          ref="inputField"
          className={'itemCreator-input'}
          type="text"
          rows="8"
          placeholder="What do you need to do?"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              this.props.onAdd(this.state.inputValue);
              this.setState({
                inputValue: ''
              })
            }
          }}
          value={this.state.inputValue}
          onChange={evt => this.updateInputValue(evt)}
        />
        <a onClick={() => {
            this.state.inputValue && this.props.onAdd(this.state.inputValue);
            this.setState({
              inputValue: ''
            })
          }} className='icon icono-plusCircle'>&nbsp;</a>
      </Item>
    );
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
}

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
