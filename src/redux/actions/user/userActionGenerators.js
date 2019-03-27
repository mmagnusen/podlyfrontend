const userActionGenerators = {
    receiveUserPodcasts: (userPodcasts) => {
        return {
            type: 'RECEIVE_USER_PODCASTS',
            userPodcasts
        }
    },
    setToken: (token) => {
        return {
            type: 'SET_TOKEN',
            token
        }
    },
    updateUser: (user) => {
        return {
            type: 'UPDATE_USER',
            user
        }
    },
    setRedirect: (redirect) => {
        return {
            type: 'SET_REDIRECT',
            redirect
        } 
    },
    handleLogout: () => {
        return {
            type: 'LOG_OUT'
        } 
    },
    updateDashboardPage: (page) => {
        return {
            type: 'DASHBOARD_PAGE',
            page    
        }
    }
}

export default userActionGenerators