const communityActionGenerators = {
    receiveCommunityPosts: (communityPosts) => {
        return {
            type: 'RECEIVE_COMMUNITY_POSTS',
            communityPosts
        }
    },
};

export default communityActionGenerators;