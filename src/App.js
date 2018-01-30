import React, { Component } from 'react';
import axios from 'axios';

import './assets/css/App.css';
import About from './components/generals/About';
import SearchBar from './components/generals/SearchBar';
import MenuBar from './components/generals/MenuBar';
import PlaceList from './components/generals/PlaceList';
import fakeData from './components/generals/FakeRes';
import { setInterval } from 'timers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      searchValue: localStorage.getItem('searchValue') || '',
      fakeData,
      places: [],
      userPlaces: [],
      searchig: false,
      mode: 'search',
    };
  }

  componentDidMount() {
    this.boot();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div className="container-fluid">
          <h2> Nightlife Coordination </h2>
          <SearchBar onSearch={this._searchPlaces} searchValue={this.state.searchValue} onChange={this._onChangeSearchValue}/>
          <MenuBar user={this.state.user} mode={this.state.mode} changeMode={this._changeMode}/>

          { this.state.mode === 'search' && (
            <PlaceList places={this.state.places} itemClicked={this._handleItemClick} user={this.state.user}/>
          )}
          { this.state.mode === 'my-bars' && (
            <PlaceList places={this.state.userPlaces} itemClicked={this._handleItemClick} user={this.state.user}/>
          )}
          
          { this.state.mode === 'about' && (
            <About/>
          )}

        </div>
       
      </div>
    );
  }

  boot() {
    const { searchValue } = this.state;
    if (searchValue) {
      this._searchPlaces();
    }
    this.getCurrentUser();
  }

  _searchPlaces = (e) => {
    

    this.setState({ searchig: true})
    this.loadButton(e);
    
    axios.get('/places/search', {
      params: {
        location: this.state.searchValue
      }
    })
      .then((res) => {
        let places = res.data;
        this.setState({ places : places, searchig: false });
      })
      .catch((err) => {
        this.setState({ searchig: false})
      })
  }

  _getUserPlaces = () => {
    const { user } = this.state;
    if (user) {
      axios.get(`/places/user/${user.id}`)
      .then((res) => {
        this.setState({ userPlaces: res.data });
      })
    }
  }

  _onChangeSearchValue = (e) => {
    const { value }  = e.target;
    localStorage.setItem('searchValue', value)
    this.setState({ searchValue: value });
  }

  _handleItemClick = (e) => {
    const { user } = this.state; 
    if (!user) {
      window.location.href = '/auth/twitter';
    } else {
      this._addUserToPlace(e);
    }
  }

  _addUserToPlace = (e) => {
    const {user , searchValue} = this.state;
    const data = {
      location: searchValue,
      userId: user.id
    }
    const form = `data=${JSON.stringify(data)}`;

    axios.post(`/places/add/${e.target.name}`, form)
      .then(() => {
        this._searchPlaces();
        this._getUserPlaces();
      })
  }
  _changeMode = (e) => {
    this.setState({ mode: e.target.name })
  }
  
  getCurrentUser() {
    axios.get('/auth/current')
      .then((res) => {
        if (res.data.user) {
          this.setState({ user: res.data.user }); 
          window.User = res.data.user;
        }
      });
  }

  loadButton(e) {    
    let strong = false;
    const button = (e) ? e.target : document.querySelector('.searchbar__button');

    button.classList.add('btn-danger');
    const timer = setInterval(() => {
      strong = !strong
      if (this.state.searchig) {
        button.innerHTML= `<i class="material-icons">${ strong ? 'hdr_strong' : 'hdr_weak'}</i>`;
      } else {
        clearInterval(timer)
        button.innerHTML= `<i class="material-icons">search</i>`;
      }
    }, 1000);
  }
}

export default App;
