import React, { Component } from 'react';
import './../../assets/css/searchbar.css';

export default class SearchBar extends Component {
  render() {
    return(
      <div className="searchbar"> 
        <input className="searchbar__input"/>
        <button className="searchbar__button"> Search </button>
      </div>
    )
  }
}