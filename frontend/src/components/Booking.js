import React,{Component} from 'react';
import BookingList from './BookingList.js';
import {Panel} from './Panel.js';
import Chart from './Chart.js';
import {Spiner} from './Spiner.js';
import AuthContext from '../context/auth-context.js';
import '../App.css';

export class Booking extends Component{
  state = {
    bookings : [],
    tab : 'list'
  }
  static contextType = AuthContext;
  changeTab = (tab) => {
    this.setState({tab})
  }
  cancelBook = (id) => {
    const requestBody = {
      query : `
        mutation {
          cancelBooking(bookingId : "${id}") {
            _id
          }
        }
      `
    }
    fetch('http://localhost:2019/graphql',{
      method:'POST',
      body : JSON.stringify(requestBody),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      let updatedBookings = this.state.bookings;
      updatedBookings = updatedBookings.filter(book =>(book._id != id));
      this.setState({bookings:updatedBookings});
    })
  }
  componentDidMount() {
    this.context.active('bookings');
    const requestBody = {
      query : `
        query {
          bookings {
            _id
            event {
              title
              description
              price
            }
            createdAt
          }
        }
      `
    }
    fetch('http://localhost:2019/graphql',{
      method:'POST',
      body : JSON.stringify(requestBody),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Basic ${this.context.token}`
      }
    })
    .then(res => res.json())
    .then(({data}) => {
      console.log(data)
      let bookings = data.bookings;
      this.setState({bookings})
    })
    .catch((err) => {console.log(err)})
  }
  render() {
    const content = (
      this.state.tab == 'list' ?
      <BookingList cancelBook = {this.cancelBook} bookings = {this.state.bookings} /> :
      <Chart bookings = {this.state.bookings}/>
    );
    return(
      <React.Fragment>
        <Panel tab = {this.state.tab} changeTab = {this.changeTab}/>
        {this.state.bookings.length != 0 ? content : <Spiner/>}
      </React.Fragment>
    )
  }
}
