import Navbar from './components/navbar';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DrawableImage from './components/DrawableImage';
import ColorSelector from './components/ColorSelector';
import FileContext from './context/FileContext';
import namer from 'color-namer';

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default function Highlight() {
    const router = useRouter();
    const file = router.query.file;
    const userInput = router.query.userInput;
    const [selectedColor, setSelectedColor] = useState('');
    const [colors, setColors] = useState([]);
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        // Get the colors from the local storage
        const colorInfo = JSON.parse(localStorage.getItem('colorInfo'));

        if (colorInfo) {
            console.log('Color Info: ', colorInfo);
            console.log('Dominant Color: ', colorInfo.result.dominant_color);

            const colorArray = colorInfo.result.palette.map((color) => {
                return color;
            });

            console.log('Color Array: ', colorArray);
            // Convert the RGB arrays to strings, then to hex, then add to the array
            const hexColorArray = colorArray.map((color) => {
                console.log('General color name: ', namer(color));
                return rgbToHex(color[0], color[1], color[2]);
            });

            // Add default green color to the array
            hexColorArray.push('#89b14e');

            // Update the colors state with the hexadecimal colors
            setColors(hexColorArray);

        } else {
            console.log('No color info found');
        }
    }, []);

    const parsePlants = (responseText) => {
        const regex = /\d+\.\s(.*?)(?=\s\d+\.|\s•|$)|•\s(.*?)(?=\s\d+\.|\s•|$)/g;
        let match;
        const plants = [];
        while ((match = regex.exec(responseText)) !== null) {
            plants.push(match[1] || match[2]);
        }
        return plants;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call OpenAI API with selected color
        const colorName = namer(selectedColor).basic[0].name;  // Get the color name
        const openAIResponse = await axios.post('/api/getPlantsByColor', {
            color: colorName,
            userInput: userInput
        });

        console.log(openAIResponse.data.responseText);  // Log the OpenAI response

        // parse the openAIResponse into an array
        const plantsArray = parsePlants(openAIResponse.data.responseText);
        console.log("Arr" + plantsArray);

        router.push({
            pathname: '/result',
            query: {
                plants: JSON.stringify(plantsArray), // Pass the array as a JSON string
                mainPlant: JSON.stringify(plantsArray[0]),
                userInput: userInput,
                color: colorName,
                file: file,
            },
        });
    };



    // Function to record a drawing action
    const recordDrawing = (x, y, event) => {
        setDrawings(drawings => [...drawings, [x, y, event]]);
    };

    console.log(file + ' is the file');
    return (
        <div>
            <Navbar />
            <h1>Highlight Plant Location</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <DrawableImage image={file} onDraw={recordDrawing} />
            </div>
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
