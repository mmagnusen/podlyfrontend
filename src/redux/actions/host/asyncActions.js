import axios from 'axios'
import hostActionGenerators from './hostActionGenerators'
import store from '../../store/store'
import { ENDPOINT } from '../../../constants'

const token = localStorage.getItem('token');

const hostAsyncActions = { 
    submitNewHost: (data, successCallback) => {
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
                if (response.status === 201) {
                    successCallback() 
                }
            })
            .catch((error) => {
                const errortext = 'There was a problem creating your podcast. Please check details and try again'
                dispatch(hostActionGenerators.submitNewHostError(errortext))
         
            }) 
        }  
    },
    submitChanges: (data, successCallback) => {
        return (dispatch) => {
            const editedHost = store.getState().host.currentHost
            axios({
                method: 'patch',
                url: `${ENDPOINT}/api/host/${editedHost.pk}`, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data: {
                    ...data,
                    pk: editedHost.pk
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    successCallback() 
                }
            })
            .catch((error) => {
                const errortext = 'There was a problem creating your podcast. Please check details and try again'
                dispatch(hostActionGenerators.editHostError(errortext))
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