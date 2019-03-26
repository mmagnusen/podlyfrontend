import defaultPodcastState from '../defaultStates/defaultPodcastState'

const podcastReducer = (state = defaultPodcastState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_MODAL_OPEN':
            return {
                ...state,
                editOpen: action.isOpen
            }
        case 'UPDATE_NAME':
            return {
                ...state,
                currentPodcast: {
                    ...state.currentPodcast,
                    name: action.name
                }
            }
        case 'UPDATE_TAGS':
            return {
                ...state,
                currentPodcast:  {
                    ...state.currentPodcast,
                    tags: action.tags
                }
            }
        case 'UPDATE_START_DATE':
            return {
                ...state,
                currentPodcast:  {
                    ...state.currentPodcast,
                    start_date: action.startDate
                }
            }
        case 'UPDATE_HOSTS':
            return {
                ...state,
                currentPodcast:  {
                    ...state.currentPodcast,
                    hosts: action.hosts
                }
            }
        case 'UPDATE_URL':
            return {
                ...state,
                currentPodcast:  {
                    ...state.currentPodcast,
                    url: action.url
                }
            }
        case 'UPDATE_DESCRIPTION':
            return {
                ...state,
                currentPodcast:  {
                    ...state.currentPodcast,
                    description: action.description
                
                }
            }
        default:
            return state
     }
}

export default podcastReducer