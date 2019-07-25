import React, { Component } from 'react';
import { NewPost, CommunityPost, Button } from '../';
import { connect } from 'react-redux';
import communityAsyncActions from './../../redux/actions/community/asyncActions';
import Modal from '@material-ui/core/Modal';
import './Community.scss';

class Community extends Component {

    state = {
        newPostOpen: false,
        activePost: null
    }

    componentDidMount() {
        this.props.dispatch(communityAsyncActions.freshRequest());
    }

    toggleNewPost = () => {    
        this.setState({
            newPostOpen: !this.state.newPostOpen
        })
    }

    updateActivePost = (pk) => {
        const { activePost } = this.state;
        
        const newActivePost = (pk === activePost) ? null : pk;

        this.setState({activePost: newActivePost});
    }

    render() {

        const { newPostOpen, activePost } = this.state;

        const { communityPosts, user } = this.props;

    return (
        <div className='Community'>
            <div className='Community-inner'>
                <section className='Community-title'><h3>Community Hub</h3></section>
                {user.token && <section className='Community-postButton'><Button onClick={this.toggleNewPost}>Create a post</Button></section>}
                <section>
                    {communityPosts.map((post) => <CommunityPost key={post.pk} post={post} activePost={activePost} updateActivePost={this.updateActivePost}/>)}
                </section>
            </div>
            <Modal
                open={newPostOpen}
                onClose={this.toggleNewPost}
                className='Platfore-modal'
            >
                <div>
                    <NewPost toggleNewPost={this.toggleNewPost}/>
                </div>
            </Modal>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        communityPosts: state.community.communityPosts,
    };
}

export default connect(mapStateToProps)(Community);
