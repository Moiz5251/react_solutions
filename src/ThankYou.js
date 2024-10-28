// src/ThankYou.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ThankYou = () => {
    return (
        <Box
            className="container-fluid w-100 d-flex justify-content-center align-items-center vh-100"
            sx={{ backgroundColor: '#f4f6f8', fontFamily: 'Poppins, sans-serif' }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    backgroundColor: '#ffffff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: 3,
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500', color: '#17436e' }}>
                    Thank You!
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif', mb: 3 }}>
                    Your payment has been successfully processed. Thank you for supporting our barcode generator service.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/" // Redirect to home or wherever needed
                    sx={{ textTransform: 'none', fontFamily: 'Poppins, sans-serif' }}
                >
                    Back to Home
                </Button>
            </Box>
        </Box>
    );
};

export default ThankYou;
