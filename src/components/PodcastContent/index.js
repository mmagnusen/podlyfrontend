import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import searchAsyncActions from './../../redux/actions/search/asyncActions'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Form, LoadingSpinner } from '../'
import './PodcastContent.scss'

class PodcastContent extends Component {
    state = {
        podcastOpen: false
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
  }


  render() {
      const { name, tags, start_date, hosts, url, description } = this.props.search.singlePodcast

      const { podcastOpen } = this.state

    return (
      <div className="PodcastContent">
        {!this.props.search.singleLoading && this.props.search.singlePodcast && (
            <Fragment>
            <section className="PodcastContent-details">
                <p>Name: {name}</p>
                <p>Tags: {tags}</p>
                <p>Age: {start_date}</p>
                <p>Host: {hosts}</p>
                <p className='PodcastContent-detailsLink'><a href={url} target='_blank' rel="noopener noreferrer">Link to podcast</a></p>
                <button onClick={() => this.handleOpen()} className='PodcastContent-detailsContact'>Contact host</button>
            </section>
            <section className="PodcastContent-description">
                <h3>Description: </h3>
                <p>{description}</p>
            </section>
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