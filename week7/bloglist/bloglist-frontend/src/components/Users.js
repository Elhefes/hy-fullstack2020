import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector, connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
} from "react-router-dom"
import Table from 'react-bootstrap/Table'

const Users = () => {
    const users = useSelector(state => state.users)

    if (!users) {
        return null
    }

    console.log(' ')
    console.log('täs1')
    console.log(users)
    console.log('täs2')
    console.log(' ')

    return (
        <div>
    <h2>Users</h2>
    <Table striped>
      <tbody>
      {users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.username}
              </Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
    )
}

export default Users