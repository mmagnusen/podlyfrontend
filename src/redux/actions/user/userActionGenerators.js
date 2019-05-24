const userActionGenerators = {
    setUserDetails: (details) => {
        return {
            type: 'SET_USER_DETAILS',
            details
        }
    },
    setRedirect: (redirect) => {
        return {
            type: 'SET_REDIRECT',
            redirect
        }
    },
    handleLogout: () => {
        localStorage.clear()
        return {
            type: 'SET_LOGOUT'
        }
    },
    updateTabIndex: (newTabIndex) => {
        return {
            type: 'UPDATE_USER_TAB',
            newTabIndex
        }
    },
    registerError: (error) => {
        return {
            type: 'REGISTER_ERROR',
            error
        } 
    },
    loginError: (error) => {
        return {
            type: 'LOGIN_ERROR',
            error
        } 
    },
    setProfile: (profile) => {
        return {
            type: 'SET_PROFILE',
            profile
        }
    }
}

export default userActionGenerators