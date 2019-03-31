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
    }
}

export default userActionGenerators