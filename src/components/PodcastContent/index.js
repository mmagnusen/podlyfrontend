import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import axios from 'axios'
import searchAsyncActions from './../../redux/actions/search/asyncActions'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Form, LoadingSpinner, Host } from '../'
import { ENDPOINT } from '../../constants'
import './PodcastContent.scss'

class PodcastContent extends Component {
    state = {
        podcastOpen: false,
        hosts: []
    }

    handleOpen = () => {
        this.setState({
            podcastOpen: true 
        })
    }

    handleClose = () => {
        this.setState({
            podcastOpen: false 
        })
    }


  componentDidMount() {
    const slug = this.props.match.params.slug
    this.props.dispatch(searchAsyncActions.singlePodcast(slug))

    const singleEndpoint = `${ENDPOINT}/api/host?slug=${this.props.match.params.slug}`
    console.log('get hosts')
        axios.get(singleEndpoint)
        .then((response) => {
            console.log('response', response)
            this.setState({
                hosts: response.data
            })
            //dispatch(searchActionGenerators.receiveSinglePodcast(response.data[0]))
        })
  }


  render() {
      const { name, tags, start_date, url, description } = this.props.search.singlePodcast

      const { podcastOpen, hosts } = this.state

    return (
      <div className="PodcastContent">
        {!this.props.search.singleLoading && this.props.search.singlePodcast && (
            <Fragment>
            <section className="PodcastContent-details">
                <p>Name: {name}</p>
                <p>Tags: {tags}</p>
                <p>Age: {start_date}</p>
                <p className='PodcastContent-detailsLink'><a href={url} target='_blank' rel="noopener noreferrer">Link to podcast</a></p>
            </section>
            <section>
                <h3>{`Host${hosts.length > 1 ? 's' : ''}`}</h3>
                    {hosts && hosts.map((host) => <Host host={host}/>) }
            </section>
            <section className="PodcastContent-description">
                <h3>Description: </h3>
                <p>{description}</p>
            </section>
            <button onClick={() => this.handleOpen()} className='PodcastContent-detailsContact'>Contact host</button>
            </Fragment>
        )}

        {
            this.props.search.singleLoading && <LoadingSpinner color={'primary'}/>
        }

       { podcastOpen === true && 
        (<Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={podcastOpen}
            onClose={this.handleClose}
            className='PodcastContent-contactForm'
        >
            <div>
                <Form handleClose={this.handleClose}/>
            </div>
        </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(withRouter(PodcastContent));