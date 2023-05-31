import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styles from './dropzone.module.css';


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
