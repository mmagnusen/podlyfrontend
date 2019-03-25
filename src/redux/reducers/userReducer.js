import defaultUserState from '../defaultStates/defaultUserState'

const userReducer = (state = defaultUserState, action = {}) => {
    switch(action.type) {
        case 'SET_TOKEN':
        return {
            ...state,
            token: action.token
        }
        case 'UPDATE_USER':
            return {
                ...state,
                firstName: action.user.first_name,
                lastName: action.user.last_name,
                email: action.user.email,
                isLoggedIn: true
            }
        case 'SET_REDIRECT':
            return {
                ...state,
                redirectToDashboard: action.redirect
            }
        case 'LOG_OUT':
            return {
                ...state,
                firstName: null,
                lastName: null,
                email: null,
                isLoggedIn: false
            } 
        default:
            return state
     }
}

export default userReducer