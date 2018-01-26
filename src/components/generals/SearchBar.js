import React, { Component } from 'react';
import './../../assets/css/searchbar.css';

export default class SearchBar extends Component {
  render() {
    return(
      <div className="searchbar"> 
        <input className="searchbar__input" value={this.props.searchValue} onChange={this.props.onChange}/>
        <button className="searchbar__button" onClick={this.props.onSearch}> <i className="material-icons">search</i> </button>
      </div>
    )
  }
}