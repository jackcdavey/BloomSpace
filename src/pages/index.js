
import { useState } from 'react';
import { useRouter } from 'next/router';
import Dropzone from '../imageHandler';

export default function Home() {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle image upload
    router.push('/highlight');
  };

  return (
    <div>
      <h1>Your AI Plant Arranger</h1>
      <Dropzone />
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
