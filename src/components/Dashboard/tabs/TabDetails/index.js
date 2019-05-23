import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ImageCropper } from '../../../'
import { storage } from '../../../../firebase'
import './TabDetails.scss'

class TabDetails extends Component {
    state = {
        profile: {
            url: null
        }
    }

    sendToFirebase = (blob) => {
        const uploadTask =  storage.ref(`profile/${'marilyn'}`).put(blob);
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
             storage.ref('profile').child('marilyn').getDownloadURL().then(profile_url => {
                 console.log('type of url', typeof profile_url, profile_url)
                 
                 this.setState({
                     profile: {
                         ...this.state.profile,
                         url: profile_url
                     }
                 })
             })
        },
     )

    }
    
    render() {

    const { user } = this.props;

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
                        <ImageCropper saveImage={this.sendToFirebase}/>
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

