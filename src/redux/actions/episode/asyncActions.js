import axios from 'axios';
import episodeActionGenerators from './episodeActionGenerators';
import store from '../../store/store';
import { ENDPOINT } from '../../../constants';

const token = localStorage.getItem('token');

const podcastAsyncActions = { 
    getEpisode: (slug) => {
        return (dispatch) => {
            const singleEndpoint = `${ENDPOINT}/api/episode?slug=${slug}`
            axios.get(singleEndpoint)
            .then((response) => {
                dispatch(episodeActionGenerators.setPlaying(response.data[0]))
            })
        };  
    },

    getFamilyEpisodes: (pk) => {
        return (dispatch) => {
            const singleEndpoint = `${ENDPOINT}/api/episode/family?podcast_pk=${pk}`
            axios.get(singleEndpoint)
            .then(({data}) => {
                dispatch(episodeActionGenerators.updateEpisdeFamily(data))
            })
        };
    },

    getUserEpisodes: () => {
        return (dispatch) => {
            token && axios({
                method: 'get',
                url: `${ENDPOINT}/api/episode/user_episodes`,
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json'
            })
            .then((response) => {
                dispatch(episodeActionGenerators.setUserEpisodes(response.data));
            })
        };  
    },

    submitChanges: () => { 
        const editedEpisode = store.getState().episode.currentEditEpisode;
        delete editedEpisode.podcast;
        delete editedEpisode.image;

        return (dispatch) => {
            axios({
                method: 'patch',
                url: `${ENDPOINT}/api/episode/${editedEpisode.pk}`, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data: editedEpisode
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        }; 
    },

    submitNewEpisode: (data) => {
        return () => {
            axios({
                method: 'post',
                url: `${ENDPOINT}/api/episode`, 
                headers: {
                    'Authorization': 'JWT '+ token
                    },
                responseType: 'json',
                data
            })
            .catch((error) => {
                console.log('error', error)
            }) 
        };
    },
};

export default podcastAsyncActions;