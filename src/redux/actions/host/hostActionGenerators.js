const hostActionGenerators = {
    setUserHosts: (hosts) => {
        return {
            type: 'UPDATE_USER_HOSTS',
            hosts
        };
    },

    updateEditModalOpen: (host = {}) => {
        return {
            type: 'HOST_EDIT_MODAL_OPEN',
            host
        };
    },

    submitNewHostError: (error) => {
        return {
            type: 'NEW_HOST_ERROR',
            error
        };
    },

    editHostError: (error) => {
        return {
            type: 'EDIT_HOST_ERROR',
            error  
        };
    }
}

export default hostActionGenerators;