let timer

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

export const setNotification = (message, duration = 5) => {
    const delay = duration * 1000
    return dispatch => {
        clearTimeout( timer )
        dispatch({ 
            type: 'SET_NOTIFICATION', 
            message 
        })
        setTimeout(() => { 
            dispatch({ type: 'REMOVE_NOTIFICATION' })
        }, delay)
    }
}

export const clearNotification = () => {
    return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer