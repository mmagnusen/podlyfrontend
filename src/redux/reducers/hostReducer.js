import defaultHostState from '../defaultStates/defaultHostState'

const hostReducer = (state = defaultHostState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_USER_HOSTS':
            return {
                ...state,
                userHosts: action.hosts
            }
        case  'HOST_EDIT_MODAL_OPEN':
            return {
                ...state,
                currentHost: action.host
            }
        case 'NEW_HOST_ERROR':
            return {
                ...state,
                newHostError: action.error
            }
        case 'EDIT_HOST_ERROR':
            return {
                ...state,
                editHostError: action.error
            }
        default:
            return state
     }
}

export default hostReducer