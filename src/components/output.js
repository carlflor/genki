import React from 'react'

function English(props) {
  const values = Array.prototype.join.call(props.value, ", ");
  return <h1>{props.name}: {values}</h1>;
}

function Word(props) {
  return <h1>{props.name}: {props.value}</h1>;
}

function Romaji(props) {
  return <h1>{props.name}: {props.value}</h1>;
}

module.exports = { English, Word, Romaji }
