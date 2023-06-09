import styles from './PlantSuggestions.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlantSuggestions = ({ plants, color, userInput }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDescriptions = async () => {
            setIsLoading(true);
            const newSuggestions = [];

            for (let i = 0; i < Math.min(plants.length, 5); i++) {
                const plant = plants[i];
                const res = await axios.post('/api/getPlantDescriptions', { plants: [plant], userInput: userInput });
                const imgRes = await axios.post('/api/getPlantImage', { plant: plant, color: color });
                const resURL = imgRes.data.imageUrl.replace(/^"|"$/g, '');

                newSuggestions.push({
                    name: plant,
                    description: res.data.descriptions[0].description,
                    imageUrl: resURL,
                    purchaseUrl: 'https://duckduckgo.com/?q=!+buy+' + plant + '+nearby',
                });
            }

            setSuggestions(newSuggestions);
            setIsLoading(false);
        };
        fetchDescriptions();
    }, [plants]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className={styles.suggestionsContainer}>
            <h2 style={{ width: '100%', marginTop: '4rem', textAlign: 'center' }}>All Plant Suggestions</h2>
            {suggestions.map((plant, index) => (
                <div key={index} className={styles.plantItem}>
                    <img src={plant.imageUrl} alt={plant.name} className={styles.plantImage} />
                    <div className={styles.plantInfo}>
                        <h3 style={{ marginBottom: 0 }}>{plant.name}</h3>
                        <p>{plant.description}</p>
                        <a style={{ backgroundColor: 'gray', width: '8rem', height: '4rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', textDecoration: 'none' }} href={plant.purchaseUrl} target="_blank" rel="noopener noreferrer">
                            <h4>Buy Now!</h4>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlantSuggestions;
