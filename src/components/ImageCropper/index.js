import React, { Component } from 'react';
import ReactCrop from "react-image-crop";
import classnames from 'classnames'
import "react-image-crop/dist/ReactCrop.css";
import { Button } from '../'
import './ImageCropper.scss'

class ImageCropper extends Component {

    defaultState = {
        originalUploadedImage: null,
        crop: {
            aspect: 10 / 10,
            width: 200,
            x: 0,
            y: 0
        },
        blob: null,
        croppedImageBlob: null 
    }

    state = {
        ...this.defaultState
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            this.setState({ originalUploadedImage: reader.result})
          );
          reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = (image, crop) => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = crop => {
        this.setState({ crop });
    };


    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageBlob = await this.getCroppedImg(
            this.imageRef,
            crop,
            "newFile.jpeg"
          );
          this.setState({ croppedImageBlob });
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
        this.setState({blob})
        resolve(this.fileUrl);
        }, "image/jpeg");
    });
    }

    saveImage = () => {
        const { saveImage } = this.props;
        const { blob } = this.state

        saveImage(blob)
    }

    resetImage = () => {
        this.setState({...this.defaultState})
    }

    render() {
        const { originalUploadedImage, crop, croppedImageBlob, loading } = this.state;
        return (
            <div className='ImageCropper'>
                <div className='ImageCropper-grid'>
                    <div className={classnames('ImageCropper-left', {'center': !originalUploadedImage })}>
                        {originalUploadedImage   ? 
                            <ReactCrop
                                src={originalUploadedImage}
                                crop={crop}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                            :
                            <i className="fas fa-question" /> 
                        }
                    </div>
                    <div className='ImageCropper-right'>
                    {croppedImageBlob ? 
                        <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageBlob} />
                    :
                    <div className='ImageCropper-profileUpload'>
                        <input type="file" id='file' onChange={this.onSelectFile} />
                        <label htmlFor="file" >choose profile pic</label>
                    </div>}
                    </div>
                </div>
                {croppedImageBlob && (
                        <div className='ImageCropper-imageControls'>
                            <Button classes='Reset' onClick={this.resetImage}> Remove Image</Button>
                            <Button classes='Save' onClick={this.saveImage} loading={loading}> Save Image</Button>
                        </div>
                    )  
                }
            </div>
        )
    }
}

export default ImageCropper

