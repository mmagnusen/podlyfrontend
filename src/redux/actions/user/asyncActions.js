import axios from 'axios'
import userActionGenerators from './userActionGenerators'
import store from '../../store/store'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const userAsyncActions = { 
    getUserPodcasts: () => {
        // return (dispatch) => {
        //     axios({
        //         method: 'get',
        //         url: 'http://127.0.0.1:8000/api/podcast', 
        //         headers: {
        //             'Authorization': 'Token '+ store.getState().user.token
        //             },
        //         responseType: 'json'
        //     })
        //     .then(({data}) => {
        //         dispatch(userActionGenerators.updateUser(data))
        //         localStorage.setItem('firstName', data.first_name)
        //         localStorage.setItem('lastName', data.last_name)
        //         localStorage.setItem('email', data.email)
        //         localStorage.setItem('isLoggedIn', true)
        //     })
        //     .then(() => {
        //         dispatch(userActionGenerators.setRedirect(true))
        //     })
        //     .catch((error) => {
        //         console.log('error', error)
        //     }) 
        // }  
    },
    submitLogin: (email, password) => {
        return (dispatch) => {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/users/api-token-auth/', 
                data: {
                        email,
                        password,
                    },
                responseType: 'json'
            })
            .then(({data}) => {
                if (data.token) {
                    localStorage.setItem('firstName', data.user.first_name)
                    localStorage.setItem('lastName', data.user.last_name)
                    localStorage.setItem('email', data.user.email)
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('isLoggedIn', true)
                }
                setTimeout( () =>  dispatch(userActionGenerators.setUserDetails({
                    first_name: data.user.first_name,
                    last_name: data.user.last_name,
                    email: data.user.email,
                    token: data.token
                }), 200));  
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
                url: 'http://127.0.0.1:8000/api/users/', 
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
                    localStorage.setItem('isLoggedIn', true)
                }
                setTimeout( () =>  dispatch(userActionGenerators.setUserDetails(data), 200));  
            })
            .catch((error) => {
                console.log('error', error)
            })
        }  
    },

    handleLogout: () => {
    //     return (dispatch) => {
    //         axios({
    //             method: 'post',
    //             url: 'https://marilynmags.pythonanywhere.com/api/rest-auth/logout/', 
    //             headers: {
    //                 'Authorization': 'Token '+ store.getState().user.token
    //                 },
    //             responseType: 'json'
    //         })
    //         .then(() => {
    //             dispatch(userActionGenerators.handleLogout())
    //             localStorage.setItem('firstName', null)
    //             localStorage.setItem('lastName', null)
    //             localStorage.setItem('email', null)
    //             localStorage.setItem('isLoggedIn', false)
    //         })
    //         .then(() => {
    //             dispatch(userActionGenerators.setRedirect(false))
    //         })
    //         .catch((error) => {
    //             console.log('error', error)
    //         }) 
    //     }
    }
}

export default userAsyncActions