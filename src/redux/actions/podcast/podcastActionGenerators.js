const podcastActionGenerators = {
    updateEditModalOpen: (isOpen) => {
        return {
            type: 'UPDATE_MODAL_OPEN',
            isOpen
        }
    },
    updateName: (name) => {
        return {
            type: 'UPDATE_NAME',
            name
        }
    },
    updateTags: (tags) => {
        return {
            type: 'UPDATE_TAGS',
            tags
        }
    },
    updateStartDate: (startDate) => {
        return {
            type: 'UPDATE_START_DATE',
            startDate
        }
    },
    updateHosts: (hosts) => {
        return {
            type: 'UPDATE_HOSTS',
            hosts
        }
    },
    updateUrl: (url) => {
        return {
            type: 'UPDATE_URL',
            url
        }
    },
    updateDescription: (description) => {
        return {
            type: 'UPDATE_DESCRIPTION',
            description
        }
    },
}

export default podcastActionGenerators