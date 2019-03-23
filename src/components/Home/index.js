import React, { Component } from 'react';
import { Podcast , Filter, LoadingSpinner } from '../../../src/components/';
import { connect } from 'react-redux'
import searchAsyncActions from './../../redux/actions/search/asyncActions'
import { withRouter } from "react-router";

class Home extends Component {
    state = {
        podcastOpen: true
    }

    componentDidMount() {
        const endpoint = `https://marilynmags.pythonanywhere.com/api/podcast`
        this.props.dispatch(searchAsyncActions.freshRequest(endpoint))
    }

  render() {
    const { podcasts, loading } = this.props.search
    return (
        <div className="App">
          <div className='Podcast-list'>
            <Filter />
            {loading && <LoadingSpinner/>}
            {
                !loading && podcasts && podcasts.map(podcast => <Podcast key={podcast.name} podcast={podcast} openForm={this.openForm}/>)
            }
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(withRouter(Home));
