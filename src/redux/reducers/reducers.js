import { combineReducers } from "redux";
import searchReducer from './searchReducer'
import userReducer from './userReducer'
import podcastReducer from './podcastReducer'
import discoverReducer from './discoverReducer'
import episodeReducer from './episodeReducer'
import hostReducer from './hostReducer'

const rootReducer = combineReducers({
    search: searchReducer,
    user: userReducer,
    podcast: podcastReducer,
    discover: discoverReducer,
    episode: episodeReducer,
    host: hostReducer,
})

export default rootReducer