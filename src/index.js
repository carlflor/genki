import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {English, Word, Romaji, Kana} from './components/results'
import Converter from 'jp-conversion'
import SearchBar from './components/search_bar'
import Client from './client';
import './index.css';

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      term: "",
      word: "",
      kana: "",
      romaji: "",
      english: "",
      none: true
    }
  }

  romajify(word) {
    console.log( word );
    if(word)
      return Converter.convert(word).romaji
    else
      return ""
  }

  searchAction(word) {
    this.setState({term: word});
    this.searchWord(word);
  }

  searchWord(query) {
    Client.search( query, (data) => {
      console.log( data.data );
      if (data.data.length < 1)
        this.setState({none: true})
      else {
        const word = data.data[0];
        this.setState({
          word: word.japanese[0].word,
          kana: word.japanese[0].reading,
          romaji: this.romajify(word.japanese[0].reading),
          english: word.senses[0].english_definitions,
          none: false
        })
      }
    });
  }

  results() {
    if(this.state.none && this.state.term === "") {
      return (
        <div className="results">
          <h3> Try searching for any word. ( ◕ ◡ ◕ ) </h3>
        </div>
      )
    }
    else if(this.state.none) {
      return (
        <div className="results">
          <h3>Oops! No Results for:</h3>
          <h1>{this.state.term} ⋌( •̀ ⌂ •́ )⋋</h1>
        </div>
      )
    } else {
      return (
        <div className="results">
          <Word name="Word" value={this.state.word} />
          <Kana name="Kana" value={this.state.kana} />
          <Romaji name="Romaji" value={this.state.romaji} />
          <English name="English" value={this.state.english} />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="main">
        <div className="wrapper">
          <SearchBar onSearch={word => this.searchAction(word)} />
          {this.results()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
