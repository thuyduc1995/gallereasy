import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './headerStyle.css';
import { SEARCH, FAVOURITE } from '../constants';

class Header extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    handleChangeMode: PropTypes.func.isRequired
  };

  render() {
    const tabStyle = this.props.mode === SEARCH ? ['searchTabBold', 'searchTab'] : ['searchTab', 'searchTabBold']
    return (
      <div className='headerContainer'>
        <div className='headerTitle'>
          <div className='leftTitle'>
            Galler<span className='boldTitle'>easy</span>
          </div>

          <div className='verticalLine' />

          <div className='rightMenu'>
            <div className={tabStyle[0]} onClick={this.props.handleChangeMode(SEARCH)}>
              Search
            </div>
            <div className={tabStyle[1]} onClick={this.props.handleChangeMode(FAVOURITE)}>
              Favourites
            </div>
          </div>

        </div>
        <div className='horizontalLine' />
      </div>
    );
  }
}

export default Header;
