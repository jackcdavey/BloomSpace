import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const API_BASE_URL = 'https://48f7-2600-1700-5454-1640-6915-7909-b4ee-bfa4.ngrok-free.app';

const ImageHandler = () => {
    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('image', file);

            // Send request to the generate-prompt endpoint
            const responsePrompt = await axios.post(`${API_BASE_URL}/generate-prompt`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Send request to the Google Vision API endpoint
            const responseGoogleVision = await axios.post(`${API_BASE_URL}/api/google-vision`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Send request to the Stable Diffusion WebUI endpoint
            const responseStableDiffusion = await axios.post(`${API_BASE_URL}/api/stable-diffusion`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Send request to the color-info endpoint
            const responseColorInfo = await axios.post(`${API_BASE_URL}/api/color-info`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Use the responses
            console.log(responsePrompt.data.result);
            console.log(responseGoogleVision.data.result);
            console.log(responseStableDiffusion.data.result);
            console.log(responseColorInfo.data);

        } catch (error) {
            console.error(error);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
        </div>
    );
}

export default ImageHandler;
