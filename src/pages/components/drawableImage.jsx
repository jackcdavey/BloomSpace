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
            context.beginPath(); // Reset the context state
        };

        const draw = (event) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect(); // get the bounding rectangle
            const scaleX = canvas.width / rect.width;   // relationship bitmap vs. element for X
            const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
            const x = (event.clientX - rect.left) * scaleX;  // scale mouse coordinates after they have
            const y = (event.clientY - rect.top) * scaleY;
            context.strokeStyle = 'rgba(255, 255, 0, 0.3)';
            context.lineWidth = 300; // make the line thicker
            context.lineCap = 'round';
            context.lineTo(x, y);
            context.stroke();
            context.beginPath();
            context.moveTo(x, y);
        };

        if (image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
            };
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        canvas.addEventListener('mousemove', draw);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
            canvas.removeEventListener('mousemove', draw);
        };
    }, [image]);

    return <canvas ref={canvasRef} style={{ border: '1px solid black', borderRadius: '3rem', width: '70%', height: '30rem' }} />;
}

export default DrawableImage;
