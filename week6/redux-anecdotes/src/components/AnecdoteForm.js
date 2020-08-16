import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from './../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))

        event.target.anecdote.value = ''
        const message = `you added '${content}'`

        dispatch(changeNotification(message, 5))

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

export default AnecdoteForm