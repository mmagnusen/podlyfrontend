import axios from 'axios'
import podcastActionGenerators from './podcastActionGenerators'
import store from '../../store/store'

const endpoint = `http://127.0.0.1:8000/api/podcast`
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const token = localStorage.getItem('token');


const podcastAsyncActions = { 
    getUserPodcasts: () => {
        return (dispatch) => {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/podcast/user_podcasts', 
                headers: {
                    'Authorization': 'JWT '+ token
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
        console.log('hello')
        return (dispatch) => {
            dispatch(podcastActionGenerators.updateEditModalOpen(false))
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