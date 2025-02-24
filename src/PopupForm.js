// src/PopupForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const PopupForm = ({ isOpen, onRequestClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/save-user-data', { name, email });
            onRequestClose();
            history.push('/thank-you');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={{ content: { padding: '20px', width: '300px', margin: 'auto' } }}>
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
        </Modal>
    );
};

export default PopupForm;
