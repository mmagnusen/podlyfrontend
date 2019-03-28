import axios from 'axios'
import podcastActionGenerators from './podcastActionGenerators'
import store from '../../store/store'

const endpoint = `http://127.0.0.1:8000/api/podcast`

const podcastAsyncActions = { 
    submitChanges: () => {
        console.log('hello')
        return (dispatch) => {
            dispatch(podcastActionGenerators.updateEditModalOpen(false))
        }  
    },
    submitNewPodcast: (data) => {
        console.log('submit podcast async action', data)
        return (dispatch) => {
            const token = localStorage.getItem('token');

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