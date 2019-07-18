import React,{Component} from 'react';
import {Modal} from './Modal.js';
import AuthContext from '../context/auth-context.js';
import {findDOMNode} from 'react-dom';
import '../App.css';

class List extends Component {
  state = {
    details : false,
    edit : false,
    title : this.props.data.title,
    description : this.props.data.description,
    price : this.props.data.price,
    date : this.props.data.date
  }
  static contextType = AuthContext;

  close = () => {
    this.setState({
      details : false,
      edit : false,
      title : this.props.data.title,
      description : this.props.data.description,
      price : this.props.data.price,
      date : this.props.data.date
    });
    findDOMNode(document.body).style.overflow = 'visible'
  }

  view = () => {
    this.setState({details:true});
    let body = findDOMNode(document.body);
    body.style.overflow = 'hidden'
  }

  edit = () => {
    this.setState({edit:true});
    let body = findDOMNode(document.body);
    body.style.overflow = 'hidden'
  }

  save = async () => {
    const requestBody = {
      query : `
        mutation {
          editEvent(eventId:"${this.props.data._id}",data:{title:"${this.state.title}",description:"${this.state.description}",price:${this.state.price},date:"${this.state.date}"}) {
            _id
          }
        }
      `
    }
    const response = await fetch('http://localhost:2019/graphql',{
      method : 'POST',
      body : JSON.stringify(requestBody),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Basic ${this.context.token}`
      }
    });
    this.setState({edit:false})
    findDOMNode(document.body).style.overflow = 'visible'
    this.props.reloadEvents();
  }

  handlerBook = async () => {
    const requestBody = {
      query : `
        mutation {
          bookEvent(eventId : "${this.props.data._id}") {
            _id
            createdAt
            updatedAt
          }
        }
      `
    }
    const response = await fetch('http://localhost:2019/graphql',{
      method : 'POST',
      body : JSON.stringify(requestBody),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Basic ${this.context.token}`
      }
    });
    this.setState({details:false});
    findDOMNode(document.body).style.overflow = 'visible'
  }

  input_handler = (e) => {
    if (e.target.id == 'title') this.setState({title:e.target.value})
    else if (e.target.id == 'desc_modal')  this.setState({description:e.target.value})
    else if (e.target.id == 'price') this.setState({price:e.target.value})
    else if (e.target.id == 'date') this.setState({date:e.target.value})
  }

  render() {
    const creatorID = this.props.data.creator._id;
    const userID = this.props.userID;
    const result = (creatorID == userID) ? <i onClick = {this.edit} title = 'You are the owner this event' id ='owner' className="fas fa-edit"></i> : <button onClick = {this.view} id = 'view-button'>View Details</button>;
    return(
      <React.Fragment>
        {
          this.state.details ? (
            <React.Fragment>
              <div className = 'shadowBox'></div>
              <Modal
                btnTextOne = 'Book'
                btnTextTwo = 'Cancel'
                add = {this.handlerBook}
                close = {this.close}
                title = {this.props.data.title}>
                <div id = 'card'>
                  <h2 >Description</h2>
                  <p id = 'info_card'>{this.props.data.description}</p>
                  <p>Creator : {this.props.data.creator.email}</p>
                </div>
                </Modal>
            </React.Fragment>
          ) : this.state.edit && (
            <React.Fragment>
              <div className = 'shadowBox'></div>
              <Modal
                btnTextOne = 'Save'
                btnTextTwo = 'Cancel'
                add = {this.save}
                close = {this.close}
                title = 'Change Event'>
                <form>
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Title</label>
                    <input onChange = {this.input_handler} value = {this.state.title} type = 'text' id = 'title'/>
                  </div>
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Price</label>
                    <input onChange = {this.input_handler}  value = {this.state.price} type = 'number' id = 'price'/>
                  </div>
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Date</label>
                    <input onChange = {this.input_handler}  value = {this.state.date} type = {this.state.date.trim().length == 0 ? 'datetime-local' : 'text'} id = 'date'/>
                  </div>
                  <div className = 'form-control'>
                    <label htmlFor = 'title'>Description</label>
                    <textarea  onChange = {this.input_handler} value = {this.state.description} rows = '3' type = 'text' id = 'desc_modal'/>
                  </div>
                </form>
                </Modal>
            </React.Fragment>
          )
        }
        <li className = 'event-items'>
          <div>
            <h2 style = {{color:'#4700b3'}}>{this.props.data.title}</h2>
            <p id = 'price'>${this.props.data.price} - {new Date(this.props.data.date).toLocaleDateString()}</p>
          </div>
          <div style = {{'textAlign':'end'}}>
            {result}
          </div>
        </li>
      </React.Fragment>
    )
  }
}
export default List;
