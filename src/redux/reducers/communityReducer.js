import defaultCommunityState from '../defaultStates/defaultCommunityState'

const communityReducer = (state = defaultCommunityState, action = {}) => {
    switch(action.type) {
        case 'RECEIVE_COMMUNITY_POSTS':
            return {
                ...state,
                communityPosts:  action.communityPosts
            }
        default:
            return state
     }
}

export default communityReducer