// SubscribeForm.js
import React from 'react';

function SubscribeForm({ name, setName, email, setEmail, handleFormSubmit, closeModal }) {
    return (
        <div style={{ textAlign: 'center', padding: '10px', position: 'relative' }}>
            {/* Close Button */}
            <button
                onClick={closeModal}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                    color: '#6200ea',
                }}
            >
                ✕
            </button>

            <div style={{ fontSize: '64px', color: '#6200ea' }}>📧</div> {/* Replace this with an SVG icon if needed */}
            <h2 style={{ margin: '5px 0', color: '#6200ea', fontWeight: 'bold' }}>SUBSCRIBE</h2>
            <p style={{ color: '#777' }}>
                Join our subscribers list to get the latest news, updates, and special offers
            </p>
            <form onSubmit={handleFormSubmit} style={{ marginTop: '0px', alignItems: 'center', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                        padding: '10px',
                        marginTop: '10px',
                        width: '100%',
                        display: 'block',
                        borderRadius: '8px',
                        border: '1px solid #6200ea',
                        outline: 'none',
                    }}
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        padding: '10px',
                        marginTop: '10px',
                        width: '100%',
                        display: 'block',
                        borderRadius: '8px',
                        border: '1px solid #6200ea',
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        marginTop: '10px',
                        width: '100%',
                        border: 'none',
                        backgroundColor: '#6200ea',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
}

export default SubscribeForm;
