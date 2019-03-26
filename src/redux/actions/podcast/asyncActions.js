import axios from 'axios'
import podcastActionGenerators from './podcastActionGenerators'

const endpoint = `https://marilynmags.pythonanywhere.com/api/podcast`

const podcastAsyncActions = { 
    submitChanges: () => {
        console.log('hello')
        return (dispatch) => {
            dispatch(podcastActionGenerators.updateEditModalOpen(false))
        }  
    },
    submitNewPodcast: () => {
        console.log('hello')
        return (dispatch) => {
            
        }  
    },
}

export default podcastAsyncActions