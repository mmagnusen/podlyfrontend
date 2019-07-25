import defaultPodcastState from '../defaultStates/defaultPodcastState';

const podcastReducer = (state = defaultPodcastState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_MODAL_OPEN':
            return {
                ...state,
                currentPodcast: action.podcast,
            };
        case 'UPDATE_USER_PODCASTS':
            return {
                ...state,
                podcasts: action.podcasts,
            };
        case 'NEW_PODCAST_ERROR':
            return {
                ...state,
                new: {
                    error: action.error,
                }
            };
        case 'EDIT_PODCAST_ERROR':
            return {
                ...state,
                edit: {
                    error: action.error,
                }
            };
        default:
            return state;
     }
};

export default podcastReducer;