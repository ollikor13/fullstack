const initialState = { filter: '' }

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return { ...state, filter: action.filter}
        default:
            return state
    }
}

export const changeFilter = (value) => {
    return ({
            type: 'SET',
            filter: value
    })

}

export default filterReducer