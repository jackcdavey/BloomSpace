// Import css file
import styles from './PlantSuggestions.module.css';

import React from 'react';

// const BuyLink = ({ word }) => {
//     const handleRedirect = () => {
//         const searchQuery = `buy ${word}`;
//         const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&btnI=1`;
//         window.open(url, '_blank');
//     };

//     return (
//         <button onClick={handleRedirect}>Buy {word}</button>
//     );
// };


const plantSuggestions = [
    {
        name: 'Hypoestes Phyllostachya',
        description: 'The Pink Polka Dot Plant is a compact and bushy houseplant with vibrant pink leaves adorned with contrasting polka dots. It thrives in moderate to bright indirect light and requires regular watering to keep the soil slightly damp.',
        imageUrl: './assets/hypoestes.png',
        purchaseUrl: 'https://www.google.com/search?q=buy+plant+1&btnI=1'
    },
    {
        name: 'Monstera Deliciosa',
        description: 'The Monstera plant, also known as the Swiss cheese plant, is a popular choice for indoor greenery with its large, glossy leaves featuring unique natural cutouts. It thrives in moderate light conditions and can add a touch of tropical elegance to any space.',
        imageUrl: './assets/monstera.png',
        purchaseUrl: 'https://example.com',
    },
];

const PlantSuggestions = () => {
    return (
        <div className={styles.suggestionsContainer}>
            <h2 style={{ width: '100%', marginTop: '4rem', textAlign: 'center' }}>All Plant Suggestions</h2>
            {plantSuggestions.map((plant, index) => (
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