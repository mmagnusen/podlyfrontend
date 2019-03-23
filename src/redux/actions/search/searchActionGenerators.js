const searchActionGenerators = {
    updateFilters: (filters) => {
        return {
            type: 'UPDATE_FILTERS',
            filters
        }
    },
    receivePodcasts: (podcasts) => {
        return {
            type: 'UPDATE_PODCASTS',
            podcasts
        }
    },
    receiveSinglePodcast: (podcast) => {
        return {
            type: 'UPDATE_SINGLE_PODCAST',
            podcast
        }
    },
    setLoading: (isLoading) => {
        return {
            type: 'SET_LOADING',
            isLoading
        }
    },
    setSingleLoading: (isLoading) => {
        return {
            type: 'SET_SINGLE_LOADING',
            isLoading
        }
    }
}

export default searchActionGenerators