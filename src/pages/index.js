import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Dropzone from '../imageHandler';
import Navbar from './components/navbar';
import axios from 'axios';
import FileContext from './context/FileContext';


export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const fileValue = useMemo(() => ({ file, setFile }), [file, setFile]);
  const [userInput, setUserInput] = useState('');

  const API_BASE_URL = 'https://4295-2600-1700-5454-1640-51d8-a507-8852-c945.ngrok-free.app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
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
        console.log('response prompt: ' + responsePrompt.data.result);
        console.log('google vision: ' + responseGoogleVision.data.result);
        console.log('stable diffusion: ' + responseStableDiffusion.data.result);
        console.log('color info: ' + responseColorInfo.data);

    } catch (error) {
        console.error(error);
    }
    console.log(file); // You should see the selected file logged in the console

    router.push({
      pathname: '/highlight',
      query: { file: file },
    });
  };

  return (
    <FileContext.Provider value={fileValue}>
    <div>
      <Navbar />
      <h1>Your AI Plant Arranger</h1>
      <Dropzone onFileDrop={setFile} />
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter any additional info..."
        />
        <button type="submit">Submit</button>
      </form>
      </div>
    </FileContext.Provider>
  );
}
