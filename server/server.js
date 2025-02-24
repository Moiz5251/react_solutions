const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userData'); // Ensure this path is correct

const app = express();

// Middleware to handle CORS and JSON body parsing
app.use(cors({
    origin: 'http://localhost:3000', // Allow your React app's origin
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type'
}));
app.use(express.json()); // Parses JSON data in request bodies

// MongoDB URI
const MONGODB_URI = 'mongodb+srv://moizhussainmh53:PVb58hEQyYlz8d8Q@barrcodegenerator.6lysf.mongodb.net/barcode_leads?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Use user routes
app.use('/api', userRoutes); // Prefix API routes

// Test Route (Optional)
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
