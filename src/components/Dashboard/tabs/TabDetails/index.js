import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ImageCropper } from '../../../'
import { storage } from '../../../../firebase'
import userAsyncActions from '../../../../redux/actions/user/asyncActions'
import './TabDetails.scss'

class TabDetails extends Component {
    state = {
        profile: {
            url: null
        },
        created: false,
        uploadingToFirebase: false
    }

    componentDidMount() {
        this.getProfile()
    }

    getProfile = () => {
        this.props.dispatch(userAsyncActions.getProfile())
    }

    sendToFirebase = (blob) => {
        const { pk } = this.props.user
        const uploadTask =  storage.ref(`profile/user_${pk}`).put(blob);
        uploadTask.on('state_changed', 
        (snapshot) => {
            //progress function ...
        },
        (error) => {
            //error function ...
            console.log('error:', error)
        },
        () => {
             //complete function ...
             storage.ref('profile').child(`user_${pk}`).getDownloadURL().then(profile_url => {
                 console.log('type of url', typeof profile_url, profile_url)
                 this.props.dispatch(userAsyncActions.updateProfile(profile_url, this.getProfile))
             })
        },
     )

    }
    
    render() {

    const { user } = this.props;
    const { uploadingToFirebase } = this.state;

        return (
            <section className='TabDetails'>
                <section className='TabDetails-title'>
                    <h3>Your details</h3>
                </section>
                <section className='TabDetails-email'>
                    <p>Email:</p> { user.email }
                </section>
                <section className='TabDetails-firstName'>
                    <p>First Name:</p>  { user.firstName }
                </section>
                <section className='TabDetails-lastName'>
                    <p>Last Name:</p>  { user.lastName }
                </section>
                <section className='TabDetails-profile'>
                    <p>Your profile picture:</p> 
                    <section>
                        {user && user.profile && user.profile.image ?
                            <div className='TabDetails-profileImage'>
                                <img src={user.profile.image} alt='profile' />
                            </div>
                            :
                            <ImageCropper saveImage={this.sendToFirebase} loading={uploadingToFirebase}/>
                        }
                    </section>
                </section>
            </section> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(TabDetails)

