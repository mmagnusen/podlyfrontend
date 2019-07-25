const podcastActionGenerators = {
    updateEditModalOpen: (podcast = {}) => {
        return {
            type: 'UPDATE_MODAL_OPEN',
            podcast
        };
    },

    updateUserPodcasts: (podcasts) => {
        return {
            type: 'UPDATE_USER_PODCASTS',
            podcasts
        };
    },

    submitNewPodcastError: (error) => {
        return {
            type: 'NEW_PODCAST_ERROR',
            error  
        }
    },

    editPodcastError: (error) => {
        return {
            type: 'EDIT_PODCAST_ERROR',
            error  
        };
    }
};

export default podcastActionGenerators;