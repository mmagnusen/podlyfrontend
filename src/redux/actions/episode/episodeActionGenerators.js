const episodeActionGenerators = {
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