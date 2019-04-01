import { combineReducers } from "redux";
import searchReducer from './searchReducer'
import userReducer from './userReducer'
import podcastReducer from './podcastReducer'
import discoverReducer from './discoverReducer'

const rootReducer = combineReducers({
    search: searchReducer,
    user: userReducer,
    podcast: podcastReducer,
    discover: discoverReducer
})

export default rootReducer