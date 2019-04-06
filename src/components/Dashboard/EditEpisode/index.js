import React, { Component } from 'react';
import { Input, TextArea } from '../../index'
import { connect } from 'react-redux'
import episodeAsyncActions from '../../../redux/actions/episode/asyncActions'
import episodeActionGenerators from '../../../redux/actions/episode/episodeActionGenerators'
import './EditEpisode.scss'

class EditEpisode extends Component {

    updateName = (event) => {
        this.props.dispatch(episodeActionGenerators.updateName(event.target.value))
    }

    updateSnippet = (event) => {
        this.props.dispatch(episodeActionGenerators.updateSnippet(event.target.value))
    }

    submitChanges = () => {
        this.props.dispatch((episodeAsyncActions.submitChanges()))
        this.props.toggleEditEpisode()
    }

    render() {

        const { name, snippet } = this.props.reduxEpisode.currentEditEpisode

        return (
            <div className='EditEpisode'>
                <div className="EditEpisode-details">

                    <section><h3>Edit episode</h3></section>
                    <section className="EditEpisode-name">
                        <p>Name:</p> <Input value={name} onChange={this.updateName}/> 
                    </section>
                    <section className="EditEpisode-snippet">
                        <p>Snippet:</p> <TextArea value={snippet} onChange={this.updateSnippet}/>
                    </section>
                </div>
                <div>
                    <button onClick={this.submitChanges}>Submit Changes</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        podcast: state.podcast,
        reduxEpisode: state.episode
    }
}

export default connect(mapStateToProps)(EditEpisode)