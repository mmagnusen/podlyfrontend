import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ListItem } from '../'
import episodeAsyncActions from '../../redux/actions/episode/asyncActions'
import './PlayList.scss'

class PlayList extends Component {

    componentDidMount() {
        this.props.dispatch(episodeAsyncActions.getFamilyEpisodes(this.props.pk))
    }

    render() {

        const { episodeFamily } = this.props.episode

        return (
            <section  className='Play-list'>
                { episodeFamily && episodeFamily.map(( episode ) => <ListItem key={episode.name} episode={episode}/>) }
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        discover: state.discover,
        episode: state.episode
    }
}

export default connect(mapStateToProps)(PlayList)