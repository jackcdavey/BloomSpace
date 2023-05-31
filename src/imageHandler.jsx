import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styles from './dropzone.module.css';

const API_BASE_URL = 'https://48f7-2600-1700-5454-1640-6915-7909-b4ee-bfa4.ngrok-free.app';

const ImageHandler = ({ onFileDrop, onSubmit }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const droppedFile = acceptedFiles[0];
        setSelectedImage(URL.createObjectURL(droppedFile)); // Preview the image
        setFile(droppedFile); // Save the file for later
        onFileDrop(droppedFile);
    }, [onFileDrop]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                {selectedImage ? (
                    <img src={selectedImage} alt="Preview" className={styles.previewImage} />
                ) : (
                    <p>Drag and drop an image here, or click to select an image</p>
                )}
            </div>
        </div>
    );
}

export default ImageHandler;
