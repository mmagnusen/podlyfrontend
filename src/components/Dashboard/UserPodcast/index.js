import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import { EditPodcast } from '../../'
import './UserPodcast.scss'

class UserPodcast extends Component {

    render() {

        const { editOpen, podcast } = this.props
        const { name, tags, start_date, hosts, url } = podcast

        return (
                <div className='UserPodcast'>
                    <div className="UserPodcast-details">
                        <p>Name: {name}</p>
                        <p>Tags: {tags}</p>
                        <p>Age: {start_date}</p>
                        <p>Host: {hosts}</p>
                        <p>Link to podcast: {url}</p>
                    </div>
                    <div>
                        <button>Edit podcast</button>
                    </div>

                    { editOpen === true && 
                        (<Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={editOpen}
                            onClose={this.handleClose}
                        >
                            <div>
                                <EditPodcast podcast={podcast}/>
                            </div>
                        </Modal>
                        )}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPodcast)