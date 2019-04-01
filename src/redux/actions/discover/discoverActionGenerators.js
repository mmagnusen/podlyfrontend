const discoverActionGenerators = {
    updateDiscoverEposides: (episodes) => {
        return {
            type: 'UPDATE_DISCOVER_EPISODES',
            episodes
        }
    },
}

export default discoverActionGenerators