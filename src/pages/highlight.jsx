import Navbar from './components/navbar';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import DrawableImage from './components/DrawableImage';
import ColorSelector from './components/ColorSelector';
import FileContext from './context/FileContext';

export default function Highlight() {
    const router = useRouter();
    const file = router.query.file;
    const [selectedColor, setSelectedColor] = useState('');
    const [colors, setColors] = useState([]);

    useEffect(() => {
        // Here you should make the request to your API to get the color palette
        // I'll set a hardcoded palette for the example
        setColors([
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255],
            [255, 255, 0],
            [0, 255, 255],
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: handle image highlighting and color selection
        router.push('/result');
    };

    return (
        <div>
            <Navbar />
            <h1>Highlight Plant Location</h1>
            <DrawableImage image={file} />
            <h1>Select Your Preferred Color</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <ColorSelector
                    colors={colors}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
