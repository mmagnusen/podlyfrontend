const hostActionGenerators = {
    setUserHosts: (hosts) => {
        return {
            type: 'UPDATE_USER_HOSTS',
            hosts
        }
    },
}

export default hostActionGenerators