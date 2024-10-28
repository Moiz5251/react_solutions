import React, { useState } from 'react';
import FileUpload from './FileUpload';
import BarcodeGenerator from './BarcodeGenerator';
import jsPDF from 'jspdf';
import BackgroundImage from './T8650-Scan-Hand.webp';

function App() {
    const [skus, setSkus] = useState([]);
    const [images, setImages] = useState([]);

    // Handle when SKUs are loaded from file upload
    const handleFileLoaded = (loadedSkus) => {
        setSkus(loadedSkus);
        setImages([]); // Reset images when a new file is loaded
    };

    // Handle when barcode images are generated
    const handleImageGenerated = (imgData, sku) => {
        setImages(prevImages => [...prevImages, { imgData, sku }]);
    };

    // Original Functionality: Combine generated images into a single PDF (1 barcode per page)
    const combineImagesToPDFSingle = () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [290, 95], // Custom dimensions for single barcodes
        });

        images.forEach(({ imgData }, index) => {
            if (index > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, 290, 95);
        });

        pdf.save("noon-barcodes-single.pdf");
    };

    // New Functionality: Combine generated images into a PDF with 4 barcodes per row
    const combineImagesToPDFGrid = () => {
        const pdf = new jsPDF({
            orientation: 'portrait', // Portrait to fit more rows
            unit: 'px',
            format: 'a4', // A4 size for the grid layout
        });

        let x = 10; // X coordinate for placing barcodes
        let y = 10; // Y coordinate for placing barcodes
        const barcodeWidth = 100; // Width of each barcode in the grid
        const barcodeHeight = 36; // Height of each barcode in the grid
        const barcodesPerRow = 4; // Number of barcodes per row
        let count = 0; // Counter to track barcodes in the row

        images.forEach(({ imgData }, index) => {
            if (count === barcodesPerRow) {
                x = 10; // Reset X coordinate when moving to a new row
                y += barcodeHeight + 10; // Move Y coordinate down by barcode height plus margin
                count = 0;
            }

            if (y + barcodeHeight > pdf.internal.pageSize.height) {
                // Add new page if height exceeds the page limit
                pdf.addPage();
                x = 10; // Reset X for the new page
                y = 10; // Reset Y for the new page
            }

            pdf.addImage(imgData, 'JPEG', x, y, barcodeWidth, barcodeHeight);

            x += barcodeWidth + 5; // Move X coordinate to the next column
            count++;
        });

        pdf.save("noon-barcodes-grid.pdf");
    };

    return (
        <div 
            className="w-100 vh-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover', // Make the image cover the entire screen
                backgroundPosition: 'center', // Center the background image
                backgroundRepeat: 'no-repeat', // Prevent image from repeating
                backgroundAttachment: 'fixed', // Fix the background image in place
                padding: '20px' // Add some padding to handle small screen spacing
            }}
        >
            <FileUpload onFileLoaded={handleFileLoaded} />

            {/* Render BarcodeGenerator for each SKU */}
            {skus.map((sku, index) => (
                <BarcodeGenerator key={index} sku={sku} onImageGenerated={handleImageGenerated} />
            ))}

            {/* Show buttons only when SKUs exist */}
            {skus.length > 0 && (
                <div className="button-container d-flex justify-content-center">
                    {/* Button for the original single barcode per page functionality */}
                    <button 
                        onClick={combineImagesToPDFSingle} 
                        className="btn btn-primary"
                        style={{ 
                            backgroundColor: '#0047ab', 
                            padding: '12px 30px', 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: 'bold', 
                            fontSize: '18px', 
                            border: 'none', 
                            borderRadius: '8px', 
                            color: '#fff', 
                            cursor: 'pointer', 
                            marginRight: '10px' 
                        }} 
                        disabled={images.length !== skus.length}
                    >
                        Combine Single PDF
                    </button>

                    {/* New button for the grid layout functionality (4 barcodes per row) */}
                    <button 
                        onClick={combineImagesToPDFGrid} 
                        className="btn btn-secondary"
                        style={{ 
                            backgroundColor: '#28a745', 
                            padding: '12px 30px', 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: 'bold', 
                            fontSize: '18px', 
                            border: 'none', 
                            borderRadius: '8px', 
                            color: '#fff', 
                            cursor: 'pointer' 
                        }} 
                        disabled={images.length !== skus.length}
                    >
                        Combine Grid PDF
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
