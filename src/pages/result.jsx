import Navbar from './components/navbar';
import PlantSuggestions from './PlantSuggestions';
import { useRouter } from 'next/router';
import axios from 'axios';
import { use, useEffect, useState } from 'react';

export default function Result() {
    const router = useRouter();
    const mainPlant = router.query.mainPlant;
    const userInput = router.query.userInput;
    const color = router.query.color;
    // const file = router.query.file;
    // console.log('Result File: ', file);
    // const resImage = new Image();
    // resImage.src = file;
    // const aiRoomName = await axios.post('/api/getAiRoomName', { file: file });
    const plants = JSON.parse(router.query.plants);

    const [aiRoomName, setAiRoomName] = useState('');
    useEffect(() => {
        const fetchAiRoomName = async () => {
            const res = await axios.post('/api/getRoomName', { mainPlant: mainPlant, userInput: userInput, color: color });
            console.log('AI Room Name: ', JSON.stringify(res));
            setAiRoomName(res.data.responseText);
        };

        fetchAiRoomName();
    }, []);


    return (
        <div>
            <Navbar />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h3>Welcome to...</h3>
                <h1 style={{ marginTop: 0, paddingTop: 0 }}>{aiRoomName}</h1>

                {/* <img src={resImage} alt='Preview' style={{ maxWidth: '50%', borderRadius: '2rem' }} /> */}

                <PlantSuggestions plants={plants} color={color} userInput={userInput} />
            </div>
        </div>
    );
}
