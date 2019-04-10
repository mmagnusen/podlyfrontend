import React, { Component } from 'react';
import { connect } from 'react-redux'
import Podcast from './Podcast'
import EditorsPick from './EditorsPick'
import discoverAsyncActions from './../../redux/actions/discover/asyncActions'
import './Discover.scss'

class Discover extends Component {
  state = {
    selectedOption: null,
  }

  componentDidMount() {
    this.props.dispatch(discoverAsyncActions.freshRequest())
  }

  render() {

    const { episodes } = this.props.discover

    return (
          <div className="Discover">
            <div className="Discover-inner">
                <section className="Discover-list">
                    <section className="Discover-listTitle"><h3>Latest Podcasts</h3></section>
                    { episodes && episodes.map(( podcast ) => <Podcast podcast={podcast} />)}
                </section>
                <section className="Discover-editorsPicks">
                  <section className="Discover-editorsTitle">
                    <h3>Our Favourites</h3>
                    <i className="fas fa-heart" />
                  </section>
                    { episodes && episodes.map(( podcast ) => <EditorsPick podcast={podcast} />)}
                </section>
            </div>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        discover: state.discover
    }
}

export default connect(mapStateToProps)(Discover)
