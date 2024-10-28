import React, { useState } from 'react';
import { Box, Button, Card, Typography, Input, Stack, useMediaQuery } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoGo from './noon-barcode.png';
// import BuyMeCoffee from './bmc-brand-logo.svg';

function FileUpload({ onFileLoaded }) {
    const [fileName, setFileName] = useState('');
    const isMobile = useMediaQuery('(max-width:600px)'); // Adjust breakpoint based on mobile screen sizes

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            setFileName(file.name);

            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const skus = content.split(/\r?\n/).filter(Boolean);
                onFileLoaded(skus);
            };
            reader.readAsText(file);
        }
    };

    const handleDownloadSample = () => {
        const sampleData = 'sku1\nsku2\nsku3\nsku100';
        const blob = new Blob([sampleData], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'sample-sku.txt';
        link.click();
    };

    return (
        <Box
            className="container-fluid d-flex justify-content-center align-items-center main-box"
            sx={{ 
                backgroundColor: 'transparent', 
                fontFamily: 'Poppins, sans-serif', 
                padding: isMobile ? '1rem' : '2rem',
                height: isMobile ? 'auto' : '100vh',
            }}
        >
            <Card
                sx={{
                    width: isMobile ? '100%' : '50%', // Full width for mobile
                    padding: '1rem',
                    boxShadow: 3,
                    borderRadius: '12px',
                    textAlign: 'center',
                    backgroundColor: '#ffffffeb',
                    margin: isMobile ? '1rem' : 'auto' // Ensure proper spacing on mobile
                }}
            >
                {/* Logo Section */}
                <Box mb={2}>
                    <img
                        src={LoGo}
                        alt="Logo"
                        style={{ width: isMobile ? '150px' : '250px', height: 'auto' }} // Adjust logo size for mobile
                    />
                </Box>

                {/* Title Section */}
                <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight:'500', color:'#17436e' }}>
                    UPLOAD YOUR SKU FILE
                </Typography>

                <Typography variant="body1" color="textSecondary" paragraph sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    Please upload a text file with a list of SKUs.
                </Typography>

                {/* Download Sample File Button */}
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDownloadSample}
                    sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}
                >
                    Download Sample File
                </Button>

                {/* File Upload Button */}
                <Stack direction="row" justifyContent="center" mb={2}>
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ 
                            textTransform: 'none', 
                            fontSize: '16px', 
                            padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem', 
                            fontFamily: 'Poppins, sans-serif' 
                        }}
                    >
                        Upload Files
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            sx={{ display: 'none' }}
                        />
                    </Button>
                </Stack>

                {/* Buy Me Coffee Logo Section */}
                {/* <Box mb={2}>
                    <img
                        src={BuyMeCoffee}
                        alt="Buy Me Coffee"
                        style={{ width: isMobile ? '100px' : '150px', height: 'auto' }} // Adjust size for mobile
                    />
                </Box> */}

                {/* Show file name when uploaded */}
                {fileName && (
                    <Typography variant="body1" color="success.main" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        File loaded: {fileName}
                    </Typography>
                )}
            </Card>
        </Box>
    );
}

export default FileUpload;
