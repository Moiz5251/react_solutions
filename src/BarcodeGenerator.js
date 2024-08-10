import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = ({ sku, onImageGenerated }) => {
    const canvasRef = useRef();
    const generatedRef = useRef(false);

    useEffect(() => {
        if (canvasRef.current && !generatedRef.current) {
            JsBarcode(canvasRef.current, sku, {
                format: "CODE128",
                width: 2,
                height: 50,
                displayValue: true,
                fontSize: 12,
                margin: 10
            });

            // Convert the canvas content to a data URL (image)
            const imgData = canvasRef.current.toDataURL("image/jpeg");
            onImageGenerated(imgData, sku);
            generatedRef.current = true;
        }
    }, [sku, onImageGenerated]);

    return (
        <canvas ref={canvasRef} width="290" height="95" style={{ backgroundColor: 'white' }} />
    );
};

export default BarcodeGenerator;
