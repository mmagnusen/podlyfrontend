import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import ReactCrop from 'react-image-crop';
import { Button } from '../../../'
import { storage } from '../../../../firebase'
import 'react-image-crop/lib/ReactCrop.scss';
import './TabDetails.scss'

class TabDetails extends Component {

    state = {
        userUploadedImage: null,
        croppedImageBlob: null,
        croppedFile: null,
        firebase_url: null,
        crop: {
            aspect: 16 / 16,
            x: 0,
            y: 0
          }
    }

    onImageLoaded = (image, crop) => {
        this.imageRef = image;
        this.setState({
            originalImageName: image.name
        })
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = crop => {
        this.setState({ crop });
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            this.setState({ userUploadedImage: reader.result })
          );
          reader.readAsDataURL(e.target.files[0]);
        }
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            "newFile.jpeg"
          );
          this.setState({ croppedImageBlob: croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error("Canvas is empty");
              return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
          }, "image/jpeg");
        });
    }

    savePicToFirebase = () => {
        const { croppedImageBlob } = this.state;
        const file = new File([croppedImageBlob], `${croppedImageBlob}.jpeg`)
        this.setState({croppedFile: file}, () => {
            if (this.state.croppedFile) {
                this.sendToFirebase()
            }
        
        })
    
    }

    sendToFirebase = () => {
        const { croppedFile, croppedImageBlob } = this.state;
     
        const uploadTask =  storage.ref(`profile/${croppedImageBlob}.jpeg`).put(croppedImageBlob);
   
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
    
                storage.ref('profile').child(croppedFile).getDownloadURL().then(profile_url => {
                         
                    // this.setState({
                    //     profile: {
                    //         ...this.state.profile,
                    //         url: profile_url
                    //     }
                    // })
                })
        },
        )
    }
    
    render() {

    const { user } = this.props;
    const { userUploadedImage, croppedImageBlob } = this.state;

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
                <section className='TabDetails-profilePic'>
                    <p>Your profile picture:</p> 
                    <div className='TabDetails-profileEdit'>
                        <div className='TabDetails-profieUpload'>
                            {userUploadedImage ? 
                            <ReactCrop 
                                src={userUploadedImage} 
                                crop={this.state.crop} 
                                className='TabDetails-reactCrop'
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                            : 
                            <Fragment>
                                <input type="file" id='file' onChange={this.onSelectFile} />
                                <label for="file" >choose profile pic</label>
                            </Fragment>
                            }
                        </div>
                        <section className='TabDetails-profilePreview'>
                            {(userUploadedImage && !croppedImageBlob) && <i className="fas fa-question" />  }
                            {(userUploadedImage && croppedImageBlob) &&  <img src={croppedImageBlob} alt='profile'/> }
                            {croppedImageBlob && <Button onClick={this.savePicToFirebase}>Save as profile image</Button>}
                        </section>
                    </div>
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

