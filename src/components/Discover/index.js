import React, { Component } from 'react';
import { connect } from 'react-redux'
import Podcast from './Podcast'
import { podcasts } from './podcasts'
import EditorsPick from './EditorsPick'
import './Discover.scss'


class Discover extends Component {
  state = {
    selectedOption: null,
  }

  render() {

    return (
          <div className="Discover">
            <div className="Discover-inner">
                <section className="Discover-list">
                    { podcasts && podcasts.map(( podcast ) => <Podcast podcast={podcast} />)}
                </section>
                <section className="Discover-editorsPicks">
                    { podcasts && podcasts.map(( podcast ) => <EditorsPick podcast={podcast} />)}
                </section>
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

export default connect(mapStateToProps)(Discover)
