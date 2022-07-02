import React, { Component } from 'react';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';

class Search extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <InputSearch { ...this.props } />
        </div>
      </div>
    );
  }
}

export default Search;
