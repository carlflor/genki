import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {English, Word, Romaji} from './components/output'
import $ from 'jquery'
import Converter from 'jp-conversion'
import SearchBar from './components/search_bar'
import Result from './components/result'
import Client from './client';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: "",
      kana: "",
      romaji: "",
      english: "",
    }
  }

  searchWord(query) {
    Client.search( query, (data) => {
      console.log( data.data );
      const word = data.data[0];
      this.setState({
        word: word.japanese[0].word,
        kana: word.japanese[0].reading,
        romaji: Converter.convert(word.japanese[0].reading).romaji,
        english: word.senses[0].english_definitions
      })
    });
  }

  translateWord(word) {

    var sourceText = word;
    var sourceLang = 'auto';
    var targetLang = 'ja';

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
              + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: data => {
        this.setState( Converter.convert(data[0][0][0]) );
        console.log( data )
      }
    });
  }

  render() {
    return (
      <div className="main">
        <div className="wrapper">
          <SearchBar onSearch={word => this.searchWord(word)} />
          <Word name="Word" value={this.state.word} />
          <Result name="Kana" value={this.state.kana} />
          <Romaji name="Romaji" value={this.state.romaji} />
          <English name="English" value={this.state.english} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
