import React, { useState } from 'react';
import FileUpload from './FileUpload';
import BarcodeGenerator from './BarcodeGenerator';
import jsPDF from 'jspdf';
import BackgroundImage from './T8650-Scan-Hand.webp';
import Modal from 'react-modal';
import axios from 'axios';
import SubscribeForm from './SubscribeForm';

Modal.setAppElement('#root');

function App() {
    const [skus, setSkus] = useState([]);
    const [images, setImages] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleFileLoaded = (loadedSkus) => {
        setSkus(loadedSkus);
        setImages([]);
    };

    const handleImageGenerated = (imgData, sku) => {
        setImages((prevImages) => [...prevImages, { imgData, sku }]);
    };

    // Combine barcodes into a single-page PDF
    const combineImagesToPDFSingle = () => {
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [290, 95] });

        images.forEach(({ imgData }, index) => {
            if (index > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, 290, 95);
        });

        pdf.save("noon-barcodes-single.pdf");
        setIsPopupOpen(true);
    };

    // Combine barcodes into a grid format PDF
    const combineImagesToPDFGrid = () => {
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
        let x = 10, y = 10;
        const barcodeWidth = 100, barcodeHeight = 36, barcodesPerRow = 4;
        let count = 0;

        images.forEach(({ imgData }) => {
            if (count === barcodesPerRow) {
                x = 10;
                y += barcodeHeight + 10;
                count = 0;
            }

            if (y + barcodeHeight > pdf.internal.pageSize.height) {
                pdf.addPage();
                x = 10;
                y = 10;
            }

            pdf.addImage(imgData, 'JPEG', x, y, barcodeWidth, barcodeHeight);
            x += barcodeWidth + 5;
            count++;
        });

        pdf.save("noon-barcodes-grid.pdf");
        setIsPopupOpen(true);
    };

    // Handle form submission for subscribing user
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make sure the URL is correct for local development
            await axios.post('http://localhost:5000/api/save-user-data', { name, email });
            setSubmitted(true); // Show thank you message upon successful submission
        } catch (error) {
            console.error('Error saving data:', error.response ? error.response.data : error.message);
            alert('An error occurred: ' + (error.response ? error.response.data.error : error.message));
        }
    };

 
    const closeModal = () => {
        setIsPopupOpen(false);
        setSubmitted(false); // Reset the submission state when closing modal
    };

    return (
        <div
            className="w-100 vh-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                padding: '20px',
            }}
        >
            <FileUpload onFileLoaded={handleFileLoaded} />

            {skus.map((sku, index) => (
                <BarcodeGenerator key={index} sku={sku} onImageGenerated={handleImageGenerated} />
            ))}

            {skus.length > 0 && (
                <div className="button-container d-flex justify-content-center">
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
                            marginRight: '10px',
                        }}
                        disabled={images.length !== skus.length}
                    >
                        Combine Single PDF
                    </button>

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
                            cursor: 'pointer',
                        }}
                        disabled={images.length !== skus.length}
                    >
                        Combine Grid PDF
                    </button>
                </div>
            )}

            <Modal
                isOpen={isPopupOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        width: '400px',
                        borderRadius: '10px',
                    },
                }}
            >
                {submitted ? (
                    <div style={{ textAlign: 'center' }}>
                        <h1>Thank You for Subscribing!</h1>
                        <p>Please check your email to confirm your subscription.</p>
                        <button
                            onClick={closeModal}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                border: 'none',
                                backgroundColor: '#6200ea',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                cursor: 'pointer',
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <SubscribeForm
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        handleFormSubmit={handleFormSubmit}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </div>
    );
}

export default App;
