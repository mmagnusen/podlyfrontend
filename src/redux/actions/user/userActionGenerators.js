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
    }
}

export default userActionGenerators