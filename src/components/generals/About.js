import React, { Component } from 'react';
import logo from './../../assets/img/yelp_logo.png';

export default class About extends Component {
  render() {
    return(
      <div className="About">
        <h4> Powered by 
          <a href="" > Yelp Fusion Api</a>
        </h4>
        <img className="logo" src={logo}/>
      </div>
    )
  }
}