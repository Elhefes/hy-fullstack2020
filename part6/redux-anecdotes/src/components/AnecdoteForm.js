import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from './../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.createAnecdote(content)

        event.target.anecdote.value = ''
        const message = `you added '${content}'`

        props.changeNotification(message, 5)

        /*
        dispatch(changeNotification(message))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
        */
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote, changeNotification
  }  

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm