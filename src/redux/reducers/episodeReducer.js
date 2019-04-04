import defaultEpisodeState from '../defaultStates/defaultEpisodeState'

const episodeReducer = (state = defaultEpisodeState, action = {}) => {
    switch(action.type) {
        case 'SET_PLAYING':
            return {
                ...state,
                currentlyPlaying: action.episode
            }
        case 'UPDATE_USER_EPISODES':
            return {
                ...state,
                userEpisodes: action.episodes
            }
        default:
            return state
     }
}

export default episodeReducer