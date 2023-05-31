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
        // Get the colors from the python server
        setColors([
            '#95837c',
            '#ccccc3',
            '#2c2324',
            '#fa04f9',
            [0, 255, 255],
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: handle image highlighting and color selection
        router.push('/result');
    };

    console.log(file + ' is the file');
    return (
        <div>
            <Navbar />
            <h1>Highlight Plant Location</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <DrawableImage image={'./assets/IMG_2374.jpeg'} />
            </div>
            {/* <img src={file} alt="Preview" /> */}
            {/* <img src="./assets/IMG_2374.jpeg" alt="Preview" style={{ maxWidth: '50%', borderRadius: '2rem' }} /> */}
            <h1 style={{ margin: 0 }}>Select Your Preferred Color</h1>

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
