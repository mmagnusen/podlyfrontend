import defaultUserState from '../defaultStates/defaultUserState'

const userReducer = (state = defaultUserState, action = {}) => {
    switch(action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                firstName: action.details.first_name,
                lastName: action.details.last_name,
                email: action.details.email,
                token: action.details.token,
            }
        case 'SET_REDIRECT':
            return {
                ...state,
                shboard: action.redirect,
            }
        case 'SET_LOGOUT':
            return {
                ...state,
                firstName: null,
                lastName: null,
                email: null,
                token: null,
            }
        default:
            return state
     }
}

export default userReducer