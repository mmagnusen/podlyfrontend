import React, { Component, Fragment } from 'react';
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

    const { publish_date, title, post, pk, publisher = {}} = this.props.post
    const { first_name, last_name, profile } = publisher
    const { activePost, updateActivePost, user } = this.props
    const { replies, reply } = this.state
    const isActive = activePost === pk
    const formattedDate = moment(publish_date).format("Do MMM YYYY")

    return (
      <div className='CommunityPost'>
        <section className='CommunityPost-originalPost'>
          <div className='CommunityPost-image'>
            <img src={profile ? profile.image : dog} alt='profile'/>
          </div>
          <div className='CommunityPost-details'>
            <h3>{title}</h3>
            <div className='CommunityPost-nameDate'> 
              <p>{`${first_name} ${last_name}`}</p>
              <p>{formattedDate}</p>
              </div>
          </div>
          <div dangerouslySetInnerHTML={getDangerousHtml(post)} className='CommunityPost-content'/>
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
              {replies.map((reply) => <Reply reply={reply} key={reply.pk}/>)}
              
              {user.token && <Fragment>
                  <RichText 
                    showMenu={true}
                    editorState={reply.value} 
                    onChange={(value) => this.updateValue(value)} 
                    onBlur={() => this.handleBlur()}
                  />
                <div className='CommunityPost-replyActions'>
                  <Button onClick={this.postReply}>Reply</Button>
                </div>
              </Fragment>
              }
            </div>
          </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}

export default connect(mapStateToProps)(CommunityPost);
