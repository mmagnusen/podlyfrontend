import React, { Component } from 'react';
import { NewPost, CommunityPost, Button } from '../';
import { connect } from 'react-redux'
import communityAsyncActions from './../../redux/actions/community/asyncActions'
import Modal from '@material-ui/core/Modal';
import './Community.scss'

class Community extends Component {

    state = {
        newPostOpen: false,
    }

    componentDidMount() {
        this.props.dispatch(communityAsyncActions.freshRequest())
    }

    toggleNewPost = () => {
        this.setState({
            newPostOpen: !this.state.newPostOpen
        })
    }

    render() {

        const { newPostOpen } = this.state
        const { communityPosts } = this.props

    return (
            <div className='Community'>
                <div className='Community-inner'>
                    <section className='Community-title'><h3>Community Hub</h3></section>
                    <section className='Community-postButton'><Button onClick={this.toggleNewPost}>Create a post</Button></section>
                    <section>
                        {communityPosts.map((post) => <CommunityPost post={post}/>)}
                    </section>
                </div>
                <Modal
                    open={newPostOpen}
                    onClose={this.toggleNewPost}
                    className='Platfore-modal'
                >
                <div>
                    <NewPost toggleNewPodcast={this.toggleNewPodcast}/>
                </div>
            </Modal>
            </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        communityPosts: state.community.communityPosts,
    }
}

export default connect(mapStateToProps)(Community);
