const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const changeNotification = (message, duration) => {
    const delay = duration * 1000
    return async dispatch => {
        await dispatch({ type: 'SET_NOTIFICATION', message })
        await setTimeout(() => { dispatch({ type: 'REMOVE_NOTIFICATION' })
        }, delay)
    }
}

export const clearNotification = () => {
    return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer