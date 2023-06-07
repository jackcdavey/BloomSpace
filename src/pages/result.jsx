import Navbar from './components/navbar';
import PlantSuggestions from './PlantSuggestions';

export default function Result() {
    const aiRoomName = 'The Rosy Dot Heaven'; // Placeholder, replace with actual room name

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

                <img src='./assets/tmpxv999h5q.png' alt='Preview' style={{ maxWidth: '50%', borderRadius: '2rem' }} />
                <PlantSuggestions />
            </div>
        </div>
    );
}
