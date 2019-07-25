import axios from 'axios';
import discoverActionGenerators from './discoverActionGenerators';
import { ENDPOINT } from '../../../constants';

const discoverAsyncActions = { 
    freshRequest: () => {
        return (dispatch) => {
            axios({
                method: 'get',
                url: `${ENDPOINT}/api/episode`, 
                responseType: 'json'
            })
            .then(({data}) => {
                dispatch(discoverActionGenerators.updateDiscoverEposides(data));
            })
            .catch((error) => {
                console.log('error', error);
            }) 
        }  
    }
};

export default discoverAsyncActions;