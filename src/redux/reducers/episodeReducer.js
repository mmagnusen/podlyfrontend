import defaultEpisodeState from '../defaultStates/defaultEpisodeState';

const episodeReducer = (state = defaultEpisodeState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_EPISODE_EDIT_OPEN':
            return {
                ...state,
                currentEditEpisode: action.episode,
            }
        case 'UPDATE_EPISODE_NAME':
            return {
                ...state,
                currentEditEpisode: {
                    ...state.currentEditEpisode,
                    name: action.name,
                },
            };
        case 'UPDATE_EPISODE_SNIPPET':
            return {
                ...state,
                currentEditEpisode: {
                    ...state.currentEditEpisode,
                    snippet: action.snippet,
                },
            };
        case 'SET_PLAYING':
            return {
                ...state,
                currentlyPlaying: action.episode,
            };
        case 'UPDATE_USER_EPISODES':
            return {
                ...state,
                userEpisodes: action.episodes,
            };
        case 'UPDATE_EPISODE_FAMILY':
            return {
                ...state,
                episodeFamily: action.episodes,
            };
        default:
            return state;
     }
}

export default episodeReducer;