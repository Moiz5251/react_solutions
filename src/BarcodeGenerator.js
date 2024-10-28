import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ sku, onImageGenerated }) => {
    const canvasRef = useRef();
    const generatedRef = useRef(false);

    useEffect(() => {
        if (canvasRef.current && !generatedRef.current) {
            const scale = window.devicePixelRatio || 1; // Adjust for higher resolution displays
            const canvas = canvasRef.current;
            canvas.width = 290 * scale;
            canvas.height = 95 * scale;
            canvas.style.width = '290px';
            canvas.style.height = '95px';
            const ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);

            JsBarcode(canvas, sku, {
                format: "CODE128",
                width: 2,
                height: 40,
                displayValue: true,
                fontSize: 20, // Increased font size for clarity
                fontOptions: "400", // Font weight
                font: "Poppins", // Font family
                margin: 10
            });

            // Convert the canvas content to a data URL (image)
            const imgData = canvas.toDataURL("image/jpeg");
            onImageGenerated(imgData, sku);
            generatedRef.current = true;
        }
    }, [sku, onImageGenerated]);

    return (
        <canvas ref={canvasRef} style={{ backgroundColor: 'white', display: "none" }} />
    );
};

export default BarcodeGenerator;
