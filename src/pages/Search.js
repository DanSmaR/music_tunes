import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumsListing from '../components/AlbumsListing';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import Loading from '../components/Loading';

class Search extends Component {
  render() {
    const { isLoading } = this.props;

    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <InputSearch { ...this.props } />
          {
            isLoading ? <Loading /> : <AlbumsListing { ...this.props } />
          }
        </div>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
