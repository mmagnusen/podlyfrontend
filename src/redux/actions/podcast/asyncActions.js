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
        console.log('get user podcasts triggered', 'token:', token, 'responseToken:', responseToken)
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
    submitChanges: () => {
        const editedPodcast = store.getState().podcast.currentPodcast
        return (dispatch) => {
            dispatch(podcastActionGenerators.updateEditModalOpen(false))
            axios({
                method: 'patch',
                url: `${ENDPOINT}/api/podcast/${editedPodcast.pk}`, 
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
    submitNewPodcast: (data) => {
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
                console.log('response from submit podcast async action', response)
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }  
    },
}

export default podcastAsyncActions