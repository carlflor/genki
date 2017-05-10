import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {term: ''}
  }

  onKeyPress = (event) => {
    if(event.key === 'Enter')
      this.searchTerm()
  }

  searchTerm() {
    this.props.onSearch(this.state.term)
  }

  render() {
    return (
      <div className="search-panel">
        <input
          className="search bar"
          value={this.state.term}
          onKeyPress={this.onKeyPress}
          onChange={event => this.setState({term: event.target.value})} />
        <button
          className="search button"
          onClick={event => this.searchTerm()}>
            Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
