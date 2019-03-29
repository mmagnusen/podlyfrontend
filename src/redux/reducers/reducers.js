import { combineReducers } from "redux";
import searchReducer from './searchReducer'
import userReducer from './userReducer'
import podcastReducer from './podcastReducer'

const rootReducer = combineReducers({
    search: searchReducer,
    user: userReducer,
    podcast: podcastReducer
})

export default rootReducer