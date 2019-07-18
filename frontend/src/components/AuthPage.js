import React,{Component} from 'react';
import AuthContext from '../context/auth-context.js';

class Auth extends Component {
  state = {
    login : '',
    password : '',
    isLogged : true,
    alert : false
  }
  static contextType = AuthContext;

  componentDidMount() {
    this.context.active('auth');
  }

  handleChange = (e) => {
    if (e.target.id == 'email') this.setState({login:e.target.value,alert:null})
    else if (e.target.id == 'password') this.setState({password:e.target.value,alert:null})
  }

  switch = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {isLogged:!prevState.isLogged}
    })
  }

  send = async (e) => {
    let requestBody;
    e.preventDefault();
    if(this.state.login.trim().length == 0 || this.state.password.trim().length == 0) {
      this.setState({alert: 'Empty fiedld(s)'})
      return false;
    }
    if (!this.state.isLogged) {
      requestBody = {
        query : `
          mutation {
            createUser(userInput : {email : "${this.state.login}", password : "${this.state.password}"}) {
              _id
              email
            }
          }
        `
      }
    } else {
      requestBody = {
        query : `
          query {
            login(email : "${this.state.login}", password : "${this.state.password}") {
              userID
              token
            }
          }
        `
      }
    }
    try {
      const response  = await fetch('http://localhost:2019/graphql',{
          method:'Post',
          body:JSON.stringify(requestBody),
          headers: {
            'Content-type' : 'application/json'
          }
        });
      const {data} = await response.json();
      if (this.state.isLogged) this.context.login(data.login.token,data.login.userID)
      else this.setState({alert:'Successfully registrated'})
    } catch(error) {
        this.setState({alert:'Invalid data'})
        return false
    }
  }
  render() {
    return (
      <form className = 'FsignIn'>
        {this.state.alert !== false && <h2 id = {(this.state.alert == 'Invalid data' || this.state.alert == 'Empty fiedld(s)') ? 'invalidData' : 'successfully'}>{this.state.alert}</h2>}
        <div className = 'form-control login'>
          <label htmlFor = 'email'>Login</label>
          <input onChange = {this.handleChange} value = {this.state.value} type = 'text' id = 'email'/>
        </div>
        <div className = 'form-control'>
          <label htmlFor = 'password'>Password</label>
          <input onChange = {this.handleChange} value = {this.state.value} type = 'password' id = 'password'/>
        </div>
        <div className = 'form-control btns'>
          <button className = 'btn-signIn' onClick = {this.send.bind(this)} >Submit</button>
          <button onClick = {this.switch} className = 'btn-signIn'>Switch  {this.state.isLogged ? 'Sign Up' : 'Sign In'}</button>
        </div>
      </form>
    )
  }
}
export default Auth;
