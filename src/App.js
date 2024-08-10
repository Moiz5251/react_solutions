import React, { useState } from 'react';
import FileUpload from './FileUpload';
import BarcodeGenerator from './BarcodeGenerator';
import jsPDF from 'jspdf';

function App() {
    const [skus, setSkus] = useState([]);
    const [images, setImages] = useState([]);

    const handleFileLoaded = (loadedSkus) => {
        setSkus(loadedSkus);
        setImages([]); // Reset images when a new file is loaded
    };

    const handleImageGenerated = (imgData, sku) => {
        setImages(prevImages => [...prevImages, { imgData, sku }]);
    };

    const combineImagesToPDF = () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [290, 95]
        });

        images.forEach(({ imgData }, index) => {
            if (index > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, 290, 95);
        });

        pdf.save("barcodes.pdf");
    };

    return (
        <div>
            <FileUpload onFileLoaded={handleFileLoaded} />
            {skus.map((sku, index) => (
                <BarcodeGenerator key={index} sku={sku} onImageGenerated={handleImageGenerated} />
            ))}
            {skus.length > 0 && (
                <button 
                    onClick={combineImagesToPDF} 
                    style={{ marginTop: '20px' }} 
                    disabled={images.length !== skus.length}>
                    Combine and Download PDF
                </button>
            )}
        </div>
    );
}

export default App;
