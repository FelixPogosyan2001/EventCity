import React from 'react';
import '../App.css';

export const Panel = (props) => {
  return(
    <div className = 'panel-control'>
      <button className = {(props.tab == 'list' ? 'activePanel' : '')} onClick = {props.changeTab.bind(this,'list')}>List</button>
      <button className = {(props.tab == 'chart' ? 'activePanel' : '')} onClick = {props.changeTab.bind(this,'chart')}>Chart</button>
    </div>
  )
}
