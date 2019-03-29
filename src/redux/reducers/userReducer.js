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
                redirectToDashboard: true,
                isLoggedIn: true
            }
        case 'SET_LOGOUT':
            return {
                ...state,
                firstName: null,
                lastName: null,
                email: null,
                token: null,
                redirectToDashboard: false,
                isLoggedIn: false
            }
        default:
            return state
     }
}

export default userReducer