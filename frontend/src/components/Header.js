import React from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../context/auth-context.js';
import '../App.css';

var handlerPanel = (link) => {
  if (link.classList.contains('hidePanel')) {
    link.classList.remove('hidePanel');
    link.classList.add('showPanel');
    document.getElementById('root').style.marginTop = '120px'
  } else {
    link.classList.remove('showPanel');
    link.classList.add('hidePanel')
    document.getElementById('root').style.marginTop = '0px' // bed
  }
}
const Header = (props) => {
  var link;
  return (
    <AuthContext.Consumer>
      {(context) => {
        const unLogged = (
          <React.Fragment>
            <li className  = {(context.link == 'auth') ? 'themeList' : ''}><NavLink to = '/auth'>Authorization</NavLink></li>
            <li className  = {(context.link == 'events') ? 'themeList' : ''}><NavLink to = '/events'>Events</NavLink></li>
          </React.Fragment>
        );
        const isLogged = (
          <React.Fragment>
            <li className  = {(context.link == 'events') ? 'themeList' : ''}><NavLink to = '/events'>Events</NavLink></li>
            <li className  = {(context.link == 'bookings') ? 'themeList' : ''}><NavLink to = '/bookings'>Bookings</NavLink></li>
            <li><button onClick = {context.logout}>Logout</button></li>
          </React.Fragment>
        )
        return (
          <header className = 'main_nav'>
            <div className = 'main_nav_logo'>
              <h2>EventCity</h2>
            </div>
            <nav className = 'main_nav_items'>
              <ul type = 'none'>
                {!context.token ? unLogged : isLogged}
              </ul>
            </nav>
            <div className = 'replace_lists'>
              <button onClick = {() => {handlerPanel(link)}}>
                <i className = "fas fa-bars"></i>
              </button>
            </div>
            <ul className = 'hidePanel' ref = {(node) => {link = node}}>
              {!context.token ? unLogged : isLogged}
            </ul>
          </header>
        )
      }}
    </AuthContext.Consumer>
  )
}
export default Header;
