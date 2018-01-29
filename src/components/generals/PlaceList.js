import React, { Component } from 'react';
import './../../assets/css/PlaceList.css';

export default class PlaceList extends Component {
  render() {
    return(
      <section className="place-list row justify-content-center col-md-12">
        {this.props.places ? this.renderList() : (<div> Loading ...</div>)}
      </section>
    )
  }
  
  renderItem(item, empty) {
    return <div className="card w-90 outline-dark" key={item.id}>
        <div className="card-body row">
          <div className="col-md-3">
            <div className="image_wrapper">
              <img src={ item.image_url } alt={item.id}/>
              <span className="image_name"></span>
            </div>
          </div>
          <div className="col-md-6 card_details">
            <h5 className="card-title text-primary">{ item.name }</h5>
            <div className="stars_container"> {this.countStars(item.rating)}|{ item.rating }</div>
            <p className="direction_container"> 
              { item.location.display_address.join() }
            </p>
            <p className="card-text"> { item.phone }</p>
          </div>
          <div className="col-md-3">
            <button className={this.classes(item)} onClick={ this.props.itemClicked } name={ item.id }> Going: { this.countUsers(item)} </button>
          </div>
        </div>
      </div>
  }

  renderList(props) {
    console.log(this.props.places);
    const list = this.props.places.map(item => this.renderItem(item));
    if (list.length > 0) {
      return (<div className="place-list-container">{list}</div>);
    }
  }

  countUsers(item) {
    return item.users ? item.users.length : 0;
  }

  isCurrentUser(item) {
    return item.users ? item.users.includes(1) : false;
  }

  countStars(rating) {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i+= 1) {
      stars.push(<i className="material-icons text-warning"> star </i>)
    }

    if (rating.toString().includes('.')) {
      stars.push(<i className="material-icons text-warning"> star_half </i>);
    }

    return stars;
  }

  classes(item) {
   return this.isCurrentUser(item) ? 'btn btn-primary' : 'btn btn-success';
  }
}