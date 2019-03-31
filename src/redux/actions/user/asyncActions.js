import axios from 'axios'
import userActionGenerators from './userActionGenerators'
import podcastAsyncActions from '../podcast/asyncActions'
import { ENDPOINT } from '../../../constants'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const userAsyncActions = { 
    submitLogin: (email, password) => {
        return (dispatch) => {
            axios({
                method: 'post',
                url: `${ENDPOINT}/api/users/api-token-auth/`, 
                data: {
                        email,
                        password,
                    },
                responseType: 'json'
            })
            .then(({data}) => {

                if ( data.token ) {
                    dispatch(podcastAsyncActions.getUserPodcasts(data.token))
                    localStorage.setItem('firstName', data.user.first_name)
                    localStorage.setItem('lastName', data.user.last_name)
                    localStorage.setItem('email', data.user.email)
                    localStorage.setItem('token', data.token)
                    dispatch(userActionGenerators.setUserDetails({
                        first_name: data.user.first_name,
                        last_name: data.user.last_name,
                        email: data.user.email,
                        token: data.token
                    }))
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
        }
    },
    submitRegister: (firstName, lastName, email, password) => {
        return (dispatch) => { 
            axios({
                method: 'post',
                url: `${ENDPOINT}/api/users/`, 
                data: {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: password
                },
                responseType: 'json'
            })
            .then(({data}) => {
                if (data.token) {
                    localStorage.setItem('firstName', data.first_name)
                    localStorage.setItem('lastName', data.last_name)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('token', data.token)
                }
                setTimeout( () =>  dispatch(userActionGenerators.setUserDetails(data), 200));  
            })
            .catch((error) => {
                console.log('error', error)
            })
        }  
    },
}

export default userAsyncActions