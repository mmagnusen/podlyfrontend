import axios from 'axios'
import communityActionGenerators from './communityActionGenerators'
import { ENDPOINT } from '../../../constants'

const token = localStorage.getItem('token');

const communityAsyncActions = { 
    freshRequest: () => {
        return (dispatch) => {
            axios({
                method: 'get',
                url: `${ENDPOINT}/api/community_post`, 
                responseType: 'json'
            })
            .then(({data}) => {
                dispatch(communityActionGenerators.receiveCommunityPosts(data))
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }  
    },
    postReply: (data, getPosts) => {
        return () => {
            axios({
                method: 'post',
                url: `${ENDPOINT}/api/community_replies`, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data
            })
            .then(() => getPosts())
            .catch((error) => {
                console.log('error', error)
            }) 
        }  
    }
}

export default communityAsyncActions