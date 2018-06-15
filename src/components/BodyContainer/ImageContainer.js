import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './imageContainer.css';


class ImageContainer extends Component {


  render() {
    const { url = '', isLike = false } = this.props;
    return (
      <div className='imageContainer' onClick={this.props.handleImageClick(url)}>
        <img src={url} className='imageContent'/>
        <FontAwesome
          className={isLike ? 'heartIconAvailable' : 'heartIconInvisible'}
          name='heart'
          size='2x'
        />
      </div>
    );
  }
}

export default ImageContainer;
