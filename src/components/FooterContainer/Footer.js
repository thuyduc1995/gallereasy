import React, { Component } from 'react';
import './footerStyle.css';

class Footer extends Component {
  render() {
    return (
      <div className='footerContainer'>
        <div className='leftFooter'>
          Gallereasy POC web app
        </div>

        <div className='rightFooter'>
          2359 Media
        </div>

      </div>
    );
  }
}

export default Footer;
