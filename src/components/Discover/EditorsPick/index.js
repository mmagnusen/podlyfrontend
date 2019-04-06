import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom';
import Truncate from 'react-truncate';
import moment from 'moment'
import './EditorsPick.scss'

class EditorsPick extends Component {
  state = {
    selectedOption: null,
  }

  render() {
    const { name, podcast_name, snippet, publish_date } = this.props.podcast
    return (
        <Link to="/play">
            <div className="EditorsPick">
                <section className="EditorsPick-name">
                    <h3>{name}</h3>
                </section>

                <section className="EditorsPick-snippet">
                    <Truncate lines={2} ellipsis={<span>...</span>}>
                        {snippet}
                    </Truncate>
                </section>

                <section className="EditorsPick-name">
                    <h3>{podcast_name}</h3>
                </section>

                <div className="EditorsPick-dateLength">
                    <section>
                        <p>{moment(publish_date).format("Do MMM YYYY") }</p>
                    </section>

                    <section>
                        <p>00:59</p>
                    </section>
                </div>
            </div>
        </Link>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(EditorsPick)
