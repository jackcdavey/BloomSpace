// Import css file
import styles from './PlantSuggestions.module.css';

const plantSuggestions = [
    {
        name: 'Plant 1',
        description: 'This is a great plant!',
        imageUrl: 'https://via.placeholder.com/150',
        purchaseUrl: 'https://example.com',
    },
    {
        name: 'Plant 2',
        description: 'This plant loves sunlight!',
        imageUrl: 'https://via.placeholder.com/150',
        purchaseUrl: 'https://example.com',
    },
];

const PlantSuggestions = () => {
    return (
        <div className={styles.suggestionsContainer}>
            <h2>Alternative Plant Suggestions</h2>
            {plantSuggestions.map((plant, index) => (
                <div key={index} className={styles.plantItem}>
                    <img src={plant.imageUrl} alt={plant.name} className={styles.plantImage} />
                    <div className={styles.plantInfo}>
                        <h3>{plant.name}</h3>
                        <p>{plant.description}</p>
                        <a href={plant.purchaseUrl} target="_blank" rel="noopener noreferrer">Buy this plant</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlantSuggestions;