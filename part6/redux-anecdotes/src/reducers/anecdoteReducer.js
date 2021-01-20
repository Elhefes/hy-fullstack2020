import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const anecdoteToVote = state.find(a => a.id === action.id)
      const changedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(a => a.id !== action.id ? a : changedAnecdote)

    case 'INIT_ANECDOTES':
      return action.data

    case 'NEW':
      return [...state, action.data]

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = anecdote => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  console.log('updated anecdote: ' + updatedAnecdote.content + updatedAnecdote.id)
  const id = anecdote.id

  return async (dispatch) => {
    const anecdote = await anecdoteService.update(updatedAnecdote);
    dispatch({ type: 'VOTE', id });
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export default reducer