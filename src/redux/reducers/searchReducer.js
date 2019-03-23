import defaultSearchState from '../defaultStates/defaultSearchState'

const searchReducer = (state = defaultSearchState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: action.filters
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.isLoading
            }
        case 'SET_SINGLE_LOADING':
            return {
                ...state,
                singleLoading: action.isLoading
            }
        case 'UPDATE_PODCASTS':
            return {
                ...state,
                podcasts: action.podcasts
            }
        case 'UPDATE_SINGLE_PODCAST':
        return {
            ...state,
            singlePodcast: action.podcast
        }
        default:
            return state
     }
}

export default searchReducer