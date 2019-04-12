import axios from 'axios'
import hostActionGenerators from './hostActionGenerators'
import { ENDPOINT } from '../../../constants'

const token = localStorage.getItem('token');

const hostAsyncActions = { 
    submitNewHost: (data) => {
        return (dispatch) => {
            axios({
                method: 'post',
                url: `${ENDPOINT}/api/host`, 
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
    getUserHosts: () => {
        return (dispatch) => {
            token && axios({
                method: 'get',
                url: `${ENDPOINT}/api/host/user_hosts`,
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json'
            })
            .then((response) => {
                dispatch(hostActionGenerators.setUserHosts(response.data))
            })
        }  
    }
}

export default hostAsyncActions