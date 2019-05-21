import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import ReactCrop from 'react-image-crop';
import { Button } from '../../../'
import Cropper from 'react-cropper';
import { storage } from '../../../../firebase'
import 'cropperjs/dist/cropper.css';
import './TabDetails.scss'

class TabDetails extends Component {

    state = {
        src: null,
        cropResult: null,
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            this.setState({ src: reader.result })
          );
          reader.readAsDataURL(e.target.files[0]);
        }
    };

    cropImage = () => {
        if (typeof this.cropper.getCroppedCanvas() === "undefined") {
            return;
          }

          this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL()
          });
    }

    
    render() {

    const { user } = this.props;
    const { src } = this.state;

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
                    <div className='TabDetails-profileEdit'>
                        <section className='TabDetails-profileUpload'>
                            {src 
                                ? 
                                <Cropper
                                    style={{ height: 250, width: '100%' }}
                                    aspectRatio={10 / 10}
                                    preview=".img-preview"
                                    guides={false}
                                    src={this.state.src}
                                    ref={cropper => { this.cropper = cropper}}
                                    viewMode={1}
                                    dragMode="move"
                                    cropBoxMovable={false}
                                    responsive={false}
                                    scalable={false}
                                    zoomable={false}
                                    zoomOnTouch={false}
                                    cropBoxMovable={true}
                                    cropBoxResizable={false}
                                />
                                    :
                                <i className="fas fa-question" /> 
                            }
                        </section>

                        {src ? 

                        <div className='TabDetails-profilePreview'>
                            <div
                                aspectRatio={10 / 10}
                                className="img-preview"
                                style={{ width: "100%", height: 300 }}
                            />
                        </div>
                        :
                        <section className='TabDetails-profileUpload'>
                            <input type="file" id='file' onChange={this.onSelectFile} />
                            <label for="file" >choose profile pic</label>
                        </section>
                        }

                      
             
                    </div>
                        {/*

                              

                             
                  
                            {(userUploadedImage && croppedImageBlob) &&  <img src={croppedImageBlob} alt='profile'/> }
                            {croppedImageBlob && <Button onClick={this.savePicToFirebase}>Save as profile image</Button>}
                   
                    */}
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

