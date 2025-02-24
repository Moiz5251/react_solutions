const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Mailchimp Config
const MAILCHIMP_API_KEY = 'e60deba0f360b3d3272f2472fb2b2aa6-us21';
const MAILCHIMP_AUDIENCE_ID = '25014e6667';
const MAILCHIMP_API_SERVER = 'us21';

// Function to send email
async function sendEmail(name, email) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'moizsaify.ms@gmail.com',
                pass: 'yqimvnmoctsfphvg', 
            },
        });

        const mailOptions = {
            from: 'moizsaify.ms@gmail.com',
            to: email,
            subject: 'Thank You for Your Submission',
            text: `Hello ${name},\n\nThank you for subscribing. We have saved your information, and you will soon receive more updates.\n\nBest regards,\nNoon Barcode`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error.message);
        return { success: false, message: 'Error sending email', error: error.message };
    }
}

// Function to subscribe to Mailchimp
async function subscribeToMailchimp(name, email) {
    const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
    const data = {
        email_address: email,
        status: 'pending',
        merge_fields: { FNAME: name }
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`
            }
        });
        console.log('Mailchimp subscription response:', response.data);
        return { success: true, message: 'User subscribed to Mailchimp' };
    } catch (error) {
        console.error('Mailchimp subscription error:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Error subscribing to Mailchimp', error: error.response ? error.response.data.detail : error.message };
    }
}

// POST route to save user data, send email, and subscribe to Mailchimp
router.post('/save-user-data', async (req, res) => {
    const { name, email } = req.body;

    // Validate request data
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    try {
        // Save user data to MongoDB
        const newUser = new User({ name, email });
        await newUser.save();
        console.log('Data saved to MongoDB');

        // Send email
        const emailResponse = await sendEmail(name, email);
        console.log('Email response:', emailResponse);

        // Subscribe to Mailchimp
        const mailchimpResponse = await subscribeToMailchimp(name, email);
        console.log('Mailchimp response:', mailchimpResponse);

        // Return success response with email and Mailchimp statuses
        res.status(200).json({
            message: 'User data saved successfully',
            emailStatus: emailResponse.message,
            mailchimpStatus: mailchimpResponse.message
        });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

module.exports = router;
