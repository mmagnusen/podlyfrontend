import axios from 'axios'
import userActionGenerators from './userActionGenerators'
import store from '../../store/store'

const userAsyncActions = { 
    getUserPodcasts: () => {
        return (dispatch) => {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/podcast', 
                headers: {
                    'Authorization': 'Token '+ store.getState().user.token
                    },
                responseType: 'json'
            })
            .then(({data}) => {
                dispatch(userActionGenerators.updateUser(data))
                localStorage.setItem('firstName', data.first_name)
                localStorage.setItem('lastName', data.last_name)
                localStorage.setItem('email', data.email)
                localStorage.setItem('isLoggedIn', true)
            })
            .then(() => {
                dispatch(userActionGenerators.setRedirect(true))
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }  
    },
    submitLogin: (email, password) => {
        return (dispatch) => {
            axios({
                method: 'post',
                url: 'https://marilynmags.pythonanywhere.com/api/rest-auth/login/', 
                data: {
                        email,
                        password,
                    },
                responseType: 'json'
            })
            .then((response) => {
                if (response.data.key) {
                    dispatch(userActionGenerators.setToken(response.data.key))
                } 
            })
            .then(()  => {
                setTimeout( () =>  dispatch(userAsyncActions.retrieveUserDetails(store.getState().user.token)), 200);  
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
                url: 'https://marilynmags.pythonanywhere.com/api/rest-auth/registration/', 
                data: {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password1: password,
                        password2: password
                    },
                responseType: 'json'
            })
            .then((response) => {
                if (response.data.key) {
                    dispatch(userActionGenerators.setToken(response.data.key))
                }
            })
            .then(()  => {
                setTimeout( () =>  dispatch(userAsyncActions.retrieveUserDetails(store.getState().user.token)), 200);  
            })
            .catch((error) => {
                console.log('error', error)
            })
        }  
    },
    retrieveUserDetails: (token) => {
        return (dispatch) => {
            axios({
                method: 'get',
                url: 'https://marilynmags.pythonanywhere.com/api/rest-auth/user/', 
                headers: {
                    'Authorization': 'Token '+ token
                    },
                responseType: 'json'
            })
            .then(({data}) => {
                dispatch(userActionGenerators.updateUser(data))
                localStorage.setItem('firstName', data.first_name)
                localStorage.setItem('lastName', data.last_name)
                localStorage.setItem('email', data.email)
                localStorage.setItem('isLoggedIn', true)
            })
            .then(() => {
                dispatch(userActionGenerators.setRedirect(true))
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }
    },
    handleLogout: () => {
        return (dispatch) => {
            axios({
                method: 'post',
                url: 'https://marilynmags.pythonanywhere.com/api/rest-auth/logout/', 
                headers: {
                    'Authorization': 'Token '+ store.getState().user.token
                    },
                responseType: 'json'
            })
            .then(() => {
                dispatch(userActionGenerators.handleLogout())
                localStorage.setItem('firstName', null)
                localStorage.setItem('lastName', null)
                localStorage.setItem('email', null)
                localStorage.setItem('isLoggedIn', false)
            })
            .then(() => {
                dispatch(userActionGenerators.setRedirect(false))
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }
    }
}

export default userAsyncActions