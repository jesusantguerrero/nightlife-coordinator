import React, { Component } from 'react';
import utils from './utils';
import axios from 'axios';
import './../../assets/css/PlaceList.css';

export default class PlaceList extends Component {
  render() {
    return(
      <section className="place-list row justify-content-center col-md-12">
        { this.places && (
          <h2 className="section-title"> { this.props.title || 'Lista de Bares' } </h2>
        )} 
        {this.props.places ? this.renderList() : (<div> Loading ...</div>)}
      </section>
    )
  }
  
  renderItem(item, empty) {
    return <div className="card w-90 outline-dark" key={item.id}>
        <div className="card-body row">
          <div className="col-md-3">
            <div className="image_wrapper">
              <img src={ item.image_url }/>
              <span className="image_name"></span>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="card-title text-primary">{ item.name }</h5>
            <div className="stars_container"> { item.rating }</div>
            <p className="direction_container"> 
              { item.location.display_address.join() }
            </p>
            <p className="card-text"> { item.phone }</p>
          </div>
          <div className="col-md-3">
            <button className="btn btn-danger" onClick={this.deleteConfirmation.bind(this)} name={item.id}> Going </button>
          </div>
        </div>
      </div>
  }

  renderList(props) {
    const list = this.props.places.map(item => this.renderItem(item));
    if (list.length > 0) {
      return (<div className="place-list-container">{list}</div>);
    }
  }

  deleteConfirmation(e) {
    e.target.classList.add('to-delete');
    const result = window.confirm('Are you sure?');
    if (result) {
      this.delete(e)
    }
    
    e.target.classList.remove('to-delete');
  }

  delete(e) {
    axios.delete(`/api/poll/delete/${e.target.name}`)
      .then(() => {
        this.props.afterDelete.call();
      })
  }

}