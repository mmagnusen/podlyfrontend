const episodeActionGenerators = {
    updateEditModalOpen: (episode = {}) => {
        return {
            type: 'UPDATE_EPISODE_EDIT_OPEN',
            episode
        }
    },
    updateName: (name) => {
        return {
            type: 'UPDATE_EPISODE_NAME',
            name
        }
    },
    updateSnippet: (snippet) => {
        return {
            type: 'UPDATE_EPISODE_SNIPPET',
            snippet
        }
    },
    setPlaying: (episode) => {
        return {
            type: 'SET_PLAYING',
            episode
        }
    },
    setUserEpisodes: (episodes) => {
        return {
            type: 'UPDATE_USER_EPISODES',
            episodes
        }
    },
}

export default episodeActionGenerators