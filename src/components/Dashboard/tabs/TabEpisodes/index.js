import React, { Component } from 'react';
import { connect } from 'react-redux';
import episodeAsyncActions from '../../../../redux/actions/episode/asyncActions';
import UserEpisode from './../../UserEpisode';
import { Button } from '../../../';
import './TabEpisodes.scss';

class TabEpisodes extends Component {
    componentDidMount() {
        this.props.dispatch(episodeAsyncActions.getUserEpisodes());
    }

    render() {
        const { toggleNewEpisode } = this.props;

        const { userEpisodes } = this.props.episode;

        return (
            <section className='TabEpisodes'>
                <section className='TabEpisodes-title'>
                    <h3>Your episodes</h3>
                    <Button onClick={() => toggleNewEpisode(true)}>Add episode</Button>
                </section>
                {userEpisodes.map((episode) => (
                    <UserEpisode 
                        key={episode.name} 
                        episode={episode}
                        toggleEditEpisode={this.props.toggleEditEpisode}
                    />))}
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        episode: state.episode
    }
};

export default connect(mapStateToProps)(TabEpisodes);

