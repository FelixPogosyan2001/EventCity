import React from 'react';
import Header from './Header.js';
import Auth from './AuthPage.js';
import AuthContext from '../context/auth-context.js';
import {Events} from './Events.js';
import {Booking} from './Booking.js';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import '../App.css';

class App extends React.Component {
  state = {
    token : null,
    userId : null,
    redirect:false,
    link : 'auth'
  }
  login = (token,userId) => {
    this.setState({token,userId})
  }

  logout = () => {
      this.setState({token : null,userId : null});
  }
  active = (args) => {
    this.setState({link:args})
  }
  render() {
      return (
        <BrowserRouter>
          <AuthContext.Provider
            value = {{
              token : this.state.token,
              userId : this.state.userId,
              login : this.login,
              logout : this.logout,
              active : this.active,
              link : this.state.link
            }}
            >
            <Header/>
            <Switch>
              {this.state.token && <Redirect from = '/' to = '/events' exact />}
              {this.state.token && <Redirect from = '/auth' to = '/events' exact />}
              {!this.state.token && <Route exact path = '/auth' component = {Auth} />}
              {this.state.token && <Route path = '/bookings' component = {Booking} />}
              <Route path = '/events' component = {Events} />
              {!this.state.token && <Redirect to = '/auth' exact />}
            </Switch>
          </AuthContext.Provider>
        </BrowserRouter>
      );
    }
}

export default App;
