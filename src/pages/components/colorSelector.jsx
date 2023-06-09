import { useState } from 'react';

function ColorSelector({ colors, commonColors, selectedColor, setSelectedColor }) {
    const [dropdownColor, setDropdownColor] = useState(selectedColor);

    const handleSelect = (e) => {
        setDropdownColor(e.target.value);
        setSelectedColor(e.target.value);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '70vw',
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <label htmlFor="color-select">Or, Pick Another Color:</label>
                <select id="color-select" value={dropdownColor} onChange={handleSelect}>
                    {commonColors.map((color, index) => (
                        <option key={index} value={color.hex}>
                            <span style={{ backgroundColor: color.hex, borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block' }}></span>
                            {color.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ColorSelector;
