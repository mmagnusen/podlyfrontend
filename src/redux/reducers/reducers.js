import { combineReducers } from "redux";
import searchReducer from './searchReducer'
import userReducer from './userReducer'
import podcastReducer from './podcastReducer'
import discoverReducer from './discoverReducer'
import episodeReducer from './episodeReducer'
import hostReducer from './hostReducer'
import communityReducer from './communityReducer'

const rootReducer = combineReducers({
    search: searchReducer,
    user: userReducer,
    podcast: podcastReducer,
    discover: discoverReducer,
    episode: episodeReducer,
    host: hostReducer,
    community: communityReducer,
})

export default rootReducer