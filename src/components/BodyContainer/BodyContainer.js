import React, { Component } from 'react';
import { map, get } from 'lodash';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import ImageContainer from './ImageContainer';
import './BodyContainer.css';
import { url, key, limit, SEARCH } from '../constants';

class BodyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, imageUrl: [], likeImageMap: {}, page: 0, searchKey: '', notFound: false };
  }

  static propTypes = {
    mode: PropTypes.string.isRequired,
  };

  handleClickSearch = async (event) => {
    event.preventDefault();
    await this.handleSearch(this.input.value);
  };

  handleSearch = async (query, isLoadMore = false) => {
    let offset = this.state.searchKey === query ? this.state.page :  0;
    let urlPrevious = isLoadMore ? [...this.state.imageUrl] : [];
    this.setState({ isLoading: true, searchKey: query });
    const response = new Promise((resolve, reject) => {
      return fetch(`${url}?${key}&q=${query}&limit=${limit}&offset=${offset++}`)
        .then(response => {
          if (response.ok) {
            resolve(response.json())
          } else {
            reject('error')
          }
        }, () => {
          reject('error')
        })
    });

    const fetchData = await response;
    const data = map(fetchData.data, (image) => {
      return image.images.original.url;
    });
    const imageUrl = urlPrevious.concat(data);
    this.setState({ isLoading: false, imageUrl, page: offset, notFound: imageUrl.length === 0});
  };

  renderImage = (isLoading, imageUrl, currentMode) => {
    if (isLoading) {
      return <FontAwesome
        className='loadingIcon'
        name='spinner'
        size='4x'
        spin
      />
    }

    if (!isLoading && this.state.notFound) {
      return (
        <div>
          <FontAwesome
            className='loadingIcon'
            name='exclamation-circle'
            size='4x'
            style={{ color: 'red' }}
          />
          <h2 className='noResultText'>No result ...</h2>
        </div>
        )
    }
    const urls = currentMode === SEARCH ?
      imageUrl : Object.keys(this.state.likeImageMap).filter(i => { return this.state.likeImageMap[i]});
    return (
      <div className='resultContainer'>
        {
          urls.map(data => {
            const isLike = this.state.likeImageMap[data];
            return (
              <ImageContainer url={data} key={url} isLike={isLike} handleImageClick={this.handleImageClick}/>
            )
          })
        }
      </div>
    )
  }

  handleImageClick = (url) => {
    return () => {
      const previousStatus = get(this.state.likeImageMap, [url], false);
      this.setState({ likeImageMap: { ...this.state.likeImageMap, [url]: !previousStatus }});
    }
  };

  render() {
    const { isLoading, imageUrl, searchKey } = this.state;
    return (
      <div className='searchBarContainer'>
        <form onSubmit={this.handleClickSearch}>
          <input type="text" className='searchInput' placeholder='Start searching for images!' ref={(input) => this.input = input}/><br />
          <div className='searchLine' />
        </form>
        {
          this.renderImage(isLoading, imageUrl, this.props.mode)
        }
        {
          imageUrl.length > 0 && this.props.mode === SEARCH ?
            <div className='loadMoreIcon' onClick={async () => { await this.handleSearch(searchKey, true) }}>
              <FontAwesome
                name='chevron-circle-down'
                size='3x'
                style={{ color: 'red' }}
              />
            </div>
            : null
        }
      </div>
    );
  }
}

export default BodyContainer;
