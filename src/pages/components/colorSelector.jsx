import { useState } from 'react';

function ColorSelector({ colors, commonColors, selectedColor, setSelectedColor }) {
    const handleSelect = (e) => {
        setSelectedColor(e.target.value);
    };

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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="color-select">Choose another color:</label>
                <select id="color-select" value={selectedColor || ''} onChange={handleSelect}>
                    <option value="" disabled hidden>Default Options</option>
                    {commonColors.map((color, index) => (
                        <option key={index} value={color.hex}>
                            {color.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ColorSelector;
