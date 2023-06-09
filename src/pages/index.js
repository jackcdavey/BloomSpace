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

  const API_BASE_URL = 'https://899e-2600-1700-5454-1640-f55e-511b-f77b-d0bf.ngrok-free.app';

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
        const formData = new FormData();
        formData.append('image', file);

        // Send request to the color-info endpoint
      const responseColorInfo = await axios.post(`${API_BASE_URL}/generate-prompt`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Use the responses
        console.log('color info: ', responseColorInfo.data);

        // Save color info to local storage
        localStorage.setItem('colorInfo', JSON.stringify(responseColorInfo.data));

    } catch (error) {
        console.error(error);
    }

    router.push({
        pathname: '/highlight',
      query: {
        file: URL.createObjectURL(file),
        userInput,
      },
    });
};


  return (
    <FileContext.Provider value={fileValue}>
    <div>
      <Navbar />
      <h1>Your AI Plant Arranger</h1>
      <Dropzone onFileDrop={setFile} />
        <form onSubmit={handleSubmit}>
          <label style={{textAlign: 'left', width: '100%', fontWeight: 'bold'}} htmlFor="userInput">Anything else?</label>
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Because why not? Enter any extra details / preferences here."
        />
        <button type="submit">Submit</button>
      </form>
      </div>
    </FileContext.Provider>
  );
}
