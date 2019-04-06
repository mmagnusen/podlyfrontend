import axios from 'axios'
import episodeActionGenerators from './episodeActionGenerators'
import { ENDPOINT } from '../../../constants'

const token = localStorage.getItem('token');

const podcastAsyncActions = { 
    getEpisode: (slug) => {
        return (dispatch) => {
            const singleEndpoint = `${ENDPOINT}/api/episode?slug=${slug}`
            axios.get(singleEndpoint)
            .then((response) => {
                dispatch(episodeActionGenerators.setPlaying(response.data[0]))
            })
        }  
    },
    getUserEpisodes: () => {
        return (dispatch) => {
            token && axios({
                method: 'get',
                url: `${ENDPOINT}/api/episode/user_episodes`,
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json'
            })
            .then((response) => {
                dispatch(episodeActionGenerators.setUserEpisodes(response.data))
            })
        }  
    },
    submitChanges: (editedPodcast) => {
        return (dispatch) => {
            axios({
                method: 'patch',
                url: `${ENDPOINT}/api/episode/${editedPodcast.pk}`, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data: editedPodcast
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }  
    },
    submitNewEpisode: (data) => {
        return () => {
            axios({
                method: 'post',
                url: `${ENDPOINT}/api/episode`, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }  
    },

}

export default podcastAsyncActions