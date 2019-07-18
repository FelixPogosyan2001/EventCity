import React from 'react';
import '../App.css';

export const Spiner = (props) => {
  return (
    <div className = 'spinerAlign'>
      <div className="lds-roller spinerAlign"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
