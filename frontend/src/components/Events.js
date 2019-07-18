import React,{Component} from 'react';
import {Modal} from './Modal.js';
import AuthContext from '../context/auth-context.js';
import List from './List.js';
import {findDOMNode} from 'react-dom';
import {Spiner} from './Spiner.js';

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingEv : false,
      events : [],
      loading : true,
      alert : false
    }
    this.title = React.createRef();
    this.description = React.createRef();
    this.price = React.createRef();
    this.date = React.createRef();
  }
  static contextType = AuthContext;

  close = () => {
    this.setState({creatingEv:false});
    findDOMNode(document.body).style.overflow = 'visible'
  }

  add = async () => {
    const title = this.title.current.value;
    const description = this.description.current.value;
    const price = +this.price.current.value;
    const date = this.date.current.value;
    if (
      title.trim().length == 0 || description.trim().length == 0 ||
      price <= 0 || date.trim().length == 0
    ) {
    this.setState({alert:'Empty field(s)'})
    return false;
    }
    const requestBody = {
      query : `
        mutation {
          createEvent(data:{title:"${title}",description:"${description}",price:${price},date:"${date}"}) {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `
    }
    try {
      const response = await fetch('http://localhost:2019/graphql',{
        method : 'POST',
        body : JSON.stringify(requestBody),
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this.context.token}`
        }
      })
      const result = await response.json();
      this.setState((prevState) => {
        findDOMNode(document.body).style.overflow = 'visible'
        return {events : [...prevState.events,result.data.createEvent],creatingEv:false}
      });
    } catch (error) {
      this.setState({alert:'Invalid syntax'});
      throw error
    }
  }

  loadEvents = async () => {
    let requestBody = {
      query : `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };
    try {
      const response = await fetch('http://localhost:2019/graphql',{
        method:'POST',
        body : JSON.stringify(requestBody),
        headers : {
          'Content-type' : 'application/json'
        }
      })
      const {data} = await response.json();
      this.setState({events:data.events,loading:false})
    } catch(error) {
      throw error;
    }
  }

  open_modal_window = () => {
    this.setState({creatingEv:true});
    findDOMNode(document.body).style.overflow = 'hidden'
  }
  // Lify cycles
  componentDidMount() {
    this.context.active('events');
    this.loadEvents()
  }
  render() {
    const events = (
      <ul type = 'none'>
        {this.state.events.map((event,i) => <List key = {i} reloadEvents = {this.loadEvents} userID = {this.context.userId} data = {event}/>)}
      </ul>
    );
    if (!this.context.token) {
      return  (this.state.loading ? <Spiner /> : events);
    }
    return(
       <React.Fragment>
        {this.state.creatingEv &&
            <React.Fragment>
              <div className = 'shadowBox'></div>
              <Modal btnTextOne = 'Add' btnTextTwo = 'Close' title = 'Event' add = {this.add} close = {this.close}>
                <form>
                  {this.state.alert !== false && <h2 style= {{color:'red'}}>{this.state.alert}</h2>}
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Title</label>
                    <input ref = {this.title} type = 'text' id = 'title'/>
                  </div>
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Price</label>
                    <input ref = {this.price} type = 'number' id = 'title'/>
                  </div>
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Date</label>
                    <input ref = {this.date} type = 'datetime-local' id = 'title'/>
                  </div>
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Description</label>
                    <textarea ref = {this.description} rows = '3' type = 'text' id = 'desc_modal'/>
                  </div>
                </form>
              </Modal>
          </React.Fragment>}
        <React.Fragment>
          <div className = 'crEvent'>
            <p>Share your event</p>
            <center><button onClick = {this.open_modal_window}>Create Event</button></center>
          </div>
          {this.state.loading ? <Spiner/> : events }
        </React.Fragment>
      </React.Fragment>
    )
  }
}
