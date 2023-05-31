function ColorSelector({ colors, selectedColor, setSelectedColor }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '50vw',
                flexDirection: 'row',
            }}
        >
            {colors.map((color, index) => (
                <button
                    className={selectedColor === color ? 'color-button-selected' : 'color-button'}
                    key={index}
                    style={{ backgroundColor: color, padding: '20px' }}
                    onClick={() => setSelectedColor(color)}

                />
            ))}
        </div>
    );
}

export default ColorSelector;
