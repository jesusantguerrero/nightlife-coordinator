import React, { Component } from 'react';
import logo from './../../assets/img/yelp_logo.png';

export default class About extends Component {
  render() {
    return(
      <div className="about">
        <h4> Powered by 
          <a href="https://www.yelp.com/" > Yelp Fusion Api</a>
        </h4>
        <img className="logo" src={logo}/>
      </div>
    )
  }
}