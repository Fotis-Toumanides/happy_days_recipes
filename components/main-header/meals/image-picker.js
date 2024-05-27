'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickClick(){
        imageInput.current.click();
    };

    function handleImageChange(event){
        const file = event.target.files[0];  // It can pick many files by adding the word "multiple" in the input element, so it's an array.
        if(!file){
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();  // FileReader is javascript method
        fileReader.onload = () => {
           setPickedImage(fileReader.result);  // This is the generated url
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>  {/* with htmlFor we connect the label with the input element with id='image'*/}
            <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked</p>}
                {pickedImage && <Image src={pickedImage} alt='Your image' fill/>}
            </div>
                <input
                    className={classes.input}
                    type='file' 
                    id={name} 
                    accept='image/png, image/jpeg' 
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                />
                <button 
                    className={classes.button} 
                    type='button'
                    onClick={handlePickClick}
                    >Pick an image</button>
            </div>
        </div>
    )
}