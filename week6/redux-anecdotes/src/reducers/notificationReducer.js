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

export const changeNotification = message => {
    return {
        type: 'SET_NOTIFICATION',
        message
    }
}


export const clearNotification = () => {
    return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer