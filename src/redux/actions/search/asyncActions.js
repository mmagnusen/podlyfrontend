import axios from 'axios'
import searchActionGenerators from './searchActionGenerators'
import { transformFilters } from '../../../utils'

const endpoint = `https://marilynmags.pythonanywhere.com/api/podcast`

const searchAsyncActions = { 
    freshRequest: () => {
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
    updateFilters: (filters) => {
        return (dispatch) => {

            dispatch(searchActionGenerators.setLoading(true))

            dispatch(searchActionGenerators.updateFilters(filters))
            const filtersString = transformFilters()

            const filtersEndpoint = `https://marilynmags.pythonanywhere.com/api/podcast?filters=${filtersString}`

            axios.get(filtersEndpoint)
            .then((response) => {
                dispatch(searchActionGenerators.receivePodcasts(response.data))
            })
            .then(() => {
                
                dispatch(searchActionGenerators.setLoading(false))

            })
        }
    },
    singlePodcast: (slug) => {

        const singleEndpoint = `https://marilynmags.pythonanywhere.com/api/podcast?slug=${slug}`
        return (dispatch) => {
            dispatch(searchActionGenerators.setSingleLoading(true))
            axios.get(singleEndpoint)
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