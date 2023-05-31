// pages/highlight.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
// import ColorSelector from '../components/ColorSelector';

export default function Highlight() {
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: handle image highlighting and color selection
        router.push('/result');
    };

    return (
        <div>
            <h1>Select Your Preferred Color</h1>
            <p>Highlight your image here: Placeholder</p>
            {/* <ColorSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor} /> */}
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
