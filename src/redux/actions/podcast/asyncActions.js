import axios from 'axios'
import podcastActionGenerators from './podcastActionGenerators'
import store from '../../store/store'
import { ENDPOINT } from '../../../constants'

const endpoint = `${ENDPOINT}/api/podcast`
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const token = localStorage.getItem('token');

const podcastAsyncActions = { 
    getUserPodcasts: (responseToken) => {
        return (dispatch) => {
            (token || responseToken) && axios({
                method: 'get',
                url: `${ENDPOINT}/api/podcast/user_podcasts`, 
                headers: {
                    'Authorization': 'JWT '+ (responseToken || token)
                    },
                responseType: 'json'
            })
            .then(({data}) => {
                dispatch(podcastActionGenerators.updateUserPodcasts(data))
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }  
    },
    submitChanges: (data, successCallback) => {
        const editedPodcast = store.getState().podcast.currentPodcast
        return (dispatch) => {
            axios({
                method: 'patch',
                url: `${ENDPOINT}/api/podcast/${editedPodcast.pk}`, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data: {
                    ...data,
                    pk: editedPodcast.pk
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(podcastActionGenerators.updateUserPodcasts([response.data]))
                    successCallback() 
                }
             
            })
            .catch(() => {
                const errortext = 'There was a problem creating your podcast. Please check details and try again'
                dispatch(podcastActionGenerators.editPodcastError(errortext))
            }) 
        }  
    },
    submitNewPodcast: (data, successCallback) => {
        return (dispatch) => {
            axios({
                method: 'post',
                url: endpoint, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data
            })
            .then((response) => {
                if (response.status === 201) {
                    successCallback() 
                }
             
            })
            .catch(() => {
                const errortext = 'There was a problem creating your podcast. Please check details and try again'
                dispatch(podcastActionGenerators.submitNewPodcastError(errortext))
            }) 
        }  
    },
}

export default podcastAsyncActions