import React from 'react'

export const Modal = (props) => {
  return (
    <div className = 'modal'>
      <header>{props.title}</header>
      <div className = 'modal-body'>{props.children}</div>
      <footer>
        <button onClick = {props.add}>{props.btnTextOne}</button>
        <button onClick = {props.close}>{props.btnTextTwo}</button>
      </footer>
    </div>
  )
}
