import React, { Component } from 'react';
import axios from 'axios'
import dog from '../../resources/dog.jpg'
import moment from 'moment'
import { RichText, Reply, Button } from '../';
import { getDangerousHtml, formValidation } from '../../utils' 
import communityAsyncActions from './../../redux/actions/community/asyncActions'
import { connect } from 'react-redux'
import { ENDPOINT } from '../../constants'
import './CommunityPost.scss'

class CommunityPost extends Component {

  state = {
    replies: [],
    reply: {
      value: '',
      isValid: null,
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    const { pk } = this.props.post
    axios({
      method: 'get',
      url: `${ENDPOINT}/api/community_replies?post=${pk}`, 
      responseType: 'json',
  })
  .then(({data}) => {
    this.setState({
      replies: data,
      reply: {
        value: '',
        isValid: null,
      }
    })
  })
  .catch((error) => {
    console.log(error)
  })
  }

  updateValue = (value) => {
    this.setState({
      reply: {
            ...this.state.reply,
            value
        }
    })
  }

  handleBlur = () => {

    const isValid = formValidation.richText(this.state.reply.value)

    this.setState({
      reply: {
            ...this.statereply,
            isValid,
        }
    })
  }

  postReply = () => {
    const { reply } = this.state
    const { pk } = this.props.post
    const data = ({
      content: reply.value,
      reply_to_post: pk
    })
    this.props.dispatch(communityAsyncActions.postReply(data, this.getPosts))
  }

  render() {

    const { publish_date, title, post, first_name, last_name, pk } = this.props.post
    const { activePost, updateActivePost } = this.props
    const { replies, reply } = this.state
    const isActive = activePost === pk
    const formattedDate = moment(publish_date).format("Do MMM YYYY")

    return (
      <div className='CommunityPost'>
        <section className='CommunityPost-originalPost'>
          <div className='CommunityPost-image'>
            <img src={dog} alt='profile'/>
          </div>
          <div className='CommunityPost-content'>
            <h3>{title}</h3>
            <p>{`${first_name} ${last_name}`}{formattedDate}</p>
            <div dangerouslySetInnerHTML={getDangerousHtml(post)}/>
          </div>
        </section>

        <div className='CommunityPost-viewMore'>
          {!isActive ?
            <i className="fas fa-chevron-down" onClick={() =>updateActivePost(pk)}/>:
            <i className="fas fa-chevron-up" onClick={() =>updateActivePost(pk)}/>
          }
        </div>

        {isActive && (
          <div className='CommunityPost-replies'>
            <div className='CommunityPost-repliesInner'>
              {replies.map((reply) => <Reply reply={reply}/>)}
              <RichText 
                showMenu={false}
                editorState={reply.value} 
                onChange={(value) => this.updateValue(value)} 
                onBlur={() => this.handleBlur()}
              />
              <div className='CommunityPost-replyActions'>
                <Button onClick={this.postReply}>Reply</Button>
                <p>Cancel</p>
              </div>
            </div>
          </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      communityPosts: state.community.communityPosts,
  }
}

export default connect(mapStateToProps)(CommunityPost);
