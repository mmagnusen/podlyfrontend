import React, { Component } from 'react';
import { Input } from '../../index'
import { connect } from 'react-redux'
import './EditPodcast.scss'

class EditPodcast extends Component {

    render() {

        const { name, tags, start_date, hosts, url } = this.props.podcast


        return (
                <div className='EditPodcast'>
                    <div className="EditPodcast-details">
                    <section>
                        <p>Name:</p> <Input value={name} /> 
                    </section>
                    <section>
                        <p>Tags:</p> <Input value={tags} />
                    </section>
                    <section>
                        <p>Age:</p> <Input value={start_date} />
                    </section>
                    <section>
                        <p>Host:</p> <Input value={hosts} />
                    </section>
                    <section>
                        <p>Link to podcast: <Input value={url} /></p>
                    </section>
                    </div>
                    <div>
                        <button>Save changes</button>
                    </div>

                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EditPodcast)