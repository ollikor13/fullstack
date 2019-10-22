const initialState = { notification: '' }

const notificationReducer = (state = initialState, action) => {
    if(action !== undefined){
        switch (action.type) {
            case 'NULL':
                return {...state, notification: ''}
            case 'VOTEs':
                return { ...state, notification: ('You voted: ' + action.content)}
            case 'TESTI':
                return { ...state, notification: action.content}
            default:
                return state
        }
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch ({
            type: 'TESTI',
            content: message
        })
        setTimeout(() => {
        dispatch ({
            type: 'NULL'
        })}
        , time*1000)
    }
}


export default notificationReducer