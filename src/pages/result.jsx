import Navbar from './components/navbar';
import PlantSuggestions from './PlantSuggestions';

export default function Result() {
    const aiRoomName = 'AI-generated Room Name'; // Placeholder, replace with actual room name

    return (
        <div>
            <Navbar />
            <h1>{aiRoomName}</h1>
            <p>Your AI-edited image here: Placeholder</p>
            <PlantSuggestions />
        </div>
    );
}
