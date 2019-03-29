const userActionGenerators = {
    setUserDetails: (details) => {
        return {
            type: 'SET_USER_DETAILS',
            details
        }
    },
}

export default userActionGenerators