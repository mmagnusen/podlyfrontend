import axios from 'axios'
import searchActionGenerators from './searchActionGenerators'

const searchAsyncActions = { 
    freshRequest: (endpoint) => {
        return (dispatch) => {
            axios.get(endpoint)
            .then((response) => {
                dispatch(searchActionGenerators.receivePodcasts(response.data))
            })
            .then(() => {
              dispatch(searchActionGenerators.setLoading(false))
            })
        }  
    },
    singlePodcast: (endpoint) => {
        return (dispatch) => {
            dispatch(searchActionGenerators.setSingleLoading(true))
            axios.get(endpoint)
            .then((response) => {
                dispatch(searchActionGenerators.receiveSinglePodcast(response.data[0]))
            })
            .then(() => {
                setTimeout( () => dispatch(searchActionGenerators.setSingleLoading(false)), 1000);
            })
        }  
    }
}

export default searchAsyncActions