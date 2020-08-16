import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote as vote } from '../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const sortedAnecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const voteAnecdote = (anecdote) => {
      dispatch(vote(anecdote))
      const message = `you voted '${anecdote.content}'`

      dispatch(changeNotification(`you voted '${anecdote.content}'`, 5))

      /*
      dispatch(changeNotification(message))
      
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      */
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => voteAnecdote(anecdote)}>vote</button>
              </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList