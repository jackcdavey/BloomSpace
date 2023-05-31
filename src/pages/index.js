import { useState } from 'react';
import { useRouter } from 'next/router';
import Dropzone from '../imageHandler';
import Navbar from './components/navbar';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [userInput, setUserInput] = useState('');

const handleSubmit = async () => {
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
            console.log(responsePrompt.data.result);
            console.log(responseGoogleVision.data.result);
            console.log(responseStableDiffusion.data.result);
            console.log(responseColorInfo.data);

        } catch (error) {
            console.error(error);
        }
    console.log(file); // You should see the selected file logged in the console

    router.push('/highlight');
  };

  return (
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
  );
}
