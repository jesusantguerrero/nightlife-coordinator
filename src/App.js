import React, { Component } from 'react';
import axios from 'axios';

import './assets/css/App.css';
import SearchBar from './components/generals/SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    // this.getCurrentUser()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div className="container-fluid">
          <i class="material-icons">add_location</i>
          <i class="material-icons">add_location</i>
          <i class="material-icons">add_location</i>
          <h2> Nightlife Coordination </h2>
          <SearchBar/>
        </div>
        <footer>Made with code, music and love by <a href="https:jesusantguerrero.com"> @JesusntGuerrero</a></footer>
      </div>
    );
  }

  
  getCurrentUser() {
    axios.get('/current')
      .then((res) => {
        if (res.data.user) {
          this.setState({ user: res.data.user }); 
          window.User = res.data.user;
        }
      })
  }
}

export default App;
