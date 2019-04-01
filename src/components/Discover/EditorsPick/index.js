import React, { Component } from 'react';
import { connect } from 'react-redux'
import './EditorsPick.scss'


class EditorsPick extends Component {
  state = {
    selectedOption: null,
  }

  render() {
    const { name, title, snippet, hosts, tags, date, length } = this.props.podcast
    return (
        <div className="EditorsPick">
            <section>
                <h3>{title}</h3>
            </section>

            <section>
                <p>{snippet}</p>
            </section>

            <section>
                <p>{name}</p>
            </section>

            <section>
                <p>{tags}</p>
            </section>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(EditorsPick)
