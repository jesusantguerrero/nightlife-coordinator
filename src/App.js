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
      searchValue: localStorage.getItem('searchValue') || '',
      fakeData,
      places: []
    };
  }

  componentDidMount() {
   this._searchPlaces();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div className="container-fluid">
          <h2> Nightlife Coordination </h2>
          <SearchBar onSearch={this._searchPlaces} searchValue={this.state.searchValue} onChange={this._onChangeSearchValue}/>
          <PlaceList places={this.state.places} itemClicked={this._addUserToPlace}/>
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
      this.setState({ places : places })
   })
  }

  _onChangeSearchValue = (e) => {
    const { value }  = e.target;
    localStorage.setItem('searchValue', value)
    this.setState({ searchValue: value });
  }

  _addUserToPlace = (e) => {
    const data = {
      location: this.state.searchValue,
      userId: 1
    }

    const form = `data=${JSON.stringify(data)}`;

    axios.post(`/places/add/${e.target.name}`, form)
      .then(() => {
        this._searchPlaces();
      })
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
