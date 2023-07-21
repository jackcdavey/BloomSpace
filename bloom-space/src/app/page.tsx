import Image from 'next/image'
import axios from 'axios';
// Import the image handler and disable SSR
import dynamic from 'next/dynamic';
const ImageHandler = dynamic(() => import('../app/imageHandler'), { ssr: false });

const API_BASE_URL = process.env.NGROK_URL;
function generatePrompt(imageUrl: string) {
  axios.post(`${API_BASE_URL}/generate-prompt`, {
    imageUrl
  })
    .then(response => {
      console.log(response.data);  // The data from the server will be logged to the console
    })
    .catch(error => {
      console.error(error);
    });
}


export default function Home() {
  return (

    <ImageHandler />
  )
}
