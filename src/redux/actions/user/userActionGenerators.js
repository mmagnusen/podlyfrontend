const userActionGenerators = {
    setUserDetails: (details) => {
        return {
            type: 'SET_USER_DETAILS',
            details
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