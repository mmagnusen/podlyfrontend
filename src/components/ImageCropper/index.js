import React, { Component } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import 'react-image-crop-component/style.css';
import { Button } from '../'
import './ImageCropper.scss'

class ImageCropper extends Component {

    state = {
        src: null,
        crop: {
            aspect: 10 / 10,
            width: 200,
            x: 0,
            y: 0
        },
        croppedImageBlob: null 
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            this.setState({ src: reader.result})
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
        const { croppedImageBlob, blob } = this.state

        saveImage(croppedImageBlob, blob)

    }

    render() {
        const { crop, croppedImageBlob, src } = this.state;
        return (
            <div className='ImageCropper'>
                <div>
                    <input type="file" onChange={this.onSelectFile} />
                </div>
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}
                {croppedImageBlob && (
                    <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageBlob} />
                )}
                {croppedImageBlob && (
                        <Button onClick={this.saveImage}> Save Image</Button>
                    )  
                }
            </div>
        )
    }
}

export default ImageCropper

