import axios from 'axios'
import communityActionGenerators from './communityActionGenerators'
import { ENDPOINT } from '../../../constants'

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
    }
}

export default communityAsyncActions