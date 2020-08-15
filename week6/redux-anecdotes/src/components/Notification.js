import React from 'react'
import { useSelector } from 'react-redux'

const Notification = (props) => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === null) return (<div/>)
  return (
    <div>
      <div style={style}>{notification}</div>
    </div>
  )
}

export default Notification