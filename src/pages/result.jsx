import Navbar from './components/navbar';
import PlantSuggestions from './PlantSuggestions';

export default function Result() {
    const aiRoomName = 'AI-generated Room Name'; // Placeholder, replace with actual room name

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
            </div>
            <p>Your AI-edited image here: Placeholder</p>
            <PlantSuggestions />
        </div>
    );
}
