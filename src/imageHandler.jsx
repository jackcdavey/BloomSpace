'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styles from './Dropzone.module.css'; // Importing styles

const API_BASE_URL = 'https://0bee-2600-1700-5454-1640-950b-52c6-9311-c655.ngrok-free.app';

const Dropzone = () => {
    const [prompt, setPrompt] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('image', file);
            const response = await axios.post(`${API_BASE_URL}/generate-prompt`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPrompt(response.data.result);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the image here...</p>
                ) : (
                    <p>Drag and drop some images here, or click to select images</p>
                )}
            </div>

            {prompt && (
                <div className={styles.prompt}>
                    <h2>Prompt:</h2>
                    <p>{prompt}</p>
                </div>
            )}
        </div>
    );
};

export default Dropzone;
