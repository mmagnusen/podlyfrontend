import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom';
import './EditorsPick.scss'

class EditorsPick extends Component {
  state = {
    selectedOption: null,
  }

  render() {
    const { name, title, snippet, hosts, tags, date, length } = this.props.podcast
    return (
        <Link to="/play">
            <div className="EditorsPick">
                <section>
                    <h3>{name}</h3>
                </section>

                <section className="EditorsPick-snippet">
                    <p>{snippet}</p>
                </section>

                <section>
            
                </section>

                <section>
                    <p>{tags}</p>
                </section>
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
