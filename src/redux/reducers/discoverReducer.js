import discoverPodcastState from '../defaultStates/defaultDiscoverState';

const discoverReducer = (state = discoverPodcastState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_DISCOVER_EPISODES':
            return {
                ...state,
                episodes:  action.episodes,
            }
        default:
            return state;
     }
};

export default discoverReducer;