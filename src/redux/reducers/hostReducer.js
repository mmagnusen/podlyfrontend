import defaultHostState from '../defaultStates/defaultHostState'

const hostReducer = (state = defaultHostState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_USER_HOSTS':
            return {
                ...state,
                userHosts: action.hosts
            }
        default:
            return state
     }
}

export default hostReducer