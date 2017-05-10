import React from 'react'

function English(props) {
  const values = Array.prototype.join.call(props.value, ", ");
  return (
    <div>
      <h3>{props.name}:</h3>
      <h1>{values}</h1>
    </div>
  )
}

function Word(props) {
  return (
    <div>
      <h3>{props.name}:</h3>
      <h1>{props.value}</h1>
    </div>
  )
}

function Romaji(props) {
  return (
    <div>
      <h3>{props.name}:</h3>
      <h1>{props.value}</h1>
    </div>
  )
}

function Kana(props) {
  return (
    <div>
      <h3>{props.name}:</h3>
      <h1>{props.value}</h1>
    </div>
  )
}

module.exports = { English, Word, Romaji, Kana }
