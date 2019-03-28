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
}

export default userActionGenerators