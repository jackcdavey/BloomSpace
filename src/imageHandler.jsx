'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const API_BASE_URL = 'https://0bee-2600-1700-5454-1640-950b-52c6-9311-c655.ngrok-free.app';

const Dropzone = () => {
    const [prompt, setPrompt] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('image', file); // change from 'file' to 'image'
            const response = await axios.post(`${API_BASE_URL}/generate-prompt`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPrompt(response.data.result); // change from 'prompt' to 'result' to match server-side response
        } catch (error) {
            console.error(error);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <h1>Image Prompt Generator</h1>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the image here...</p>
                ) : (
                    <p>Drag and drop some images here, or click to select images</p>
                )}
            </div>

            {prompt && (
                <div>
                    <h2>Prompt:</h2>
                    <p>{prompt}</p>
                </div>
            )}
        </div>
    );
};

export default Dropzone;
