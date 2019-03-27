const userActionGenerators = {
    receiveUserPodcasts: (userPodcasts) => {
        // return {
        //     type: 'RECEIVE_USER_PODCASTS',
        //     userPodcasts
        // }
    },
    setUserDetails: (details) => {
        return {
            type: 'SET_USER_DETAILS',
            details
        }
    },
    updateUser: (user) => {
        // return {
        //     type: 'UPDATE_USER',
        //     user
        // }
    },
    setRedirect: (redirect) => {
        // return {
        //     type: 'SET_REDIRECT',
        //     redirect
        // } 
    },
    handleLogout: () => {
        // return {
        //     type: 'LOG_OUT'
        // } 
    },
    updateDashboardPage: (page) => {
        // return {
        //     type: 'DASHBOARD_PAGE',
        //     page    
        // }
    }
}

export default userActionGenerators