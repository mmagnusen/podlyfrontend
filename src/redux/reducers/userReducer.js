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
                pk: action.details.pk
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
        case 'UPDATE_USER_TAB':
            return {
                ...state,
                dashboardTabIndex: action.newTabIndex
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                registerError: action.error
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: action.error
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
     }
}

export default userReducer