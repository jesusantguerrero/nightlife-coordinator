import React, { Component } from 'react';
import axios from 'axios';

import './assets/css/App.css';
import SearchBar from './components/generals/SearchBar';
import PlaceList from './components/generals/PlaceList';
import fakeData from './components/generals/FakeRes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      searchValue: '',
      fakeData,
      places: {
        businesses: []
      }
    };
  }

  componentDidMount() {
   const searchValue = localStorage.getItem('searchValue');
   this.setState({ searchValue: searchValue })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div className="container-fluid">
          <h2> Nightlife Coordination </h2>
          <SearchBar onSearch={this._searchPlaces} searchValue={this.state.searchValue} onChange={this._onChangeSearchValue}/>
          <PlaceList places={this.state.places.businesses}/>
        </div>
        <footer>Made with code, music and love by <a href="https:jesusantguerrero.com"> @JesusntGuerrero</a></footer>
      </div>
    );
  }
  _searchPlaces = (e) => {
   axios.get('/places/search', {
     params: {
       location: this.state.searchValue
     }
   }).then((res) => {
      let places = res.data;
      places = places || { businesses : [] };
      this.setState({ places : places })
   })
  }

  _onChangeSearchValue = (e) => {
    const { value }  = e.target;
    localStorage.setItem('searchValue', value)
    this.setState({ searchValue: value });
  }
  
  getCurrentUser() {
    axios.get('/current')
      .then((res) => {
        if (res.data.user) {
          this.setState({ user: res.data.user }); 
          window.User = res.data.user;
        }
      });
  }
}

export default App;
