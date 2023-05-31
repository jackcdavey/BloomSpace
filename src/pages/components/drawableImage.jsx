import { useRef, useEffect } from 'react';

function DrawableImage({ image }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let isDrawing = false;

        const startDrawing = (event) => {
            isDrawing = true;
            draw(event);
        };

        const stopDrawing = () => {
            isDrawing = false;
        };

        const draw = (event) => {
            if (!isDrawing) return;
            context.strokeStyle = 'yellow'; // Set the color of the drawing
            context.lineWidth = 5; // Set the width of the drawing
            context.lineCap = 'round'; // Set the end of the line to be rounded
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            context.stroke();
            context.beginPath();
            context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        };

        if (image) {
            const img = new Image();
            img.src = URL.createObjectURL(image);
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
            };
        }

        // Add the event listeners to the canvas
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        canvas.addEventListener('mousemove', draw);

        return () => {
            // Remove the event listeners from the canvas
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
            canvas.removeEventListener('mousemove', draw);
        };
    }, [image]);

    return <canvas ref={canvasRef} />;
}

export default DrawableImage;
