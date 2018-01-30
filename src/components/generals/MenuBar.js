import React, { Component } from 'react';
import './../../assets/css/MenuBar.css';

export default class MenuBar extends Component {
  render() {
    return(
      <ul className="nav my-nav nav-pills nav-fill">
        <li className="nav-item">
          <a className={this.getClass('search')} href="#" name="search" onClick={this.props.changeMode}> Search</a>
        </li>
        { this.props.user && (
          <li className="nav-item">
            <a className={this.getClass('my-bars')} href="#" name="my-bars" onClick={this.props.changeMode}> My Bars</a>
          </li>
        )}
        <li className="nav-item">
          <a className={this.getClass('about')} href="#" name="about" onClick={this.props.changeMode}> About</a>
        </li>
      </ul>
    )
  }

  getClass(name) {
    return this.props.mode === name ? 'nav-link active': 'nav-link';
  }
}