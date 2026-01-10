import React from 'react';

const HomeTitle: React.FC = () => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '.05em',
            background: 'linear-gradient(135deg, var(--primary), var(--link))',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: 'white',
            borderRadius: '.3em',
        }}>
            <h1 style={{
                margin: '0',
                fontSize: '2rem',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
            }}>Welcome to Ranked</h1>
            <p style={{
                margin: '0',
                fontSize: '1rem',
                fontWeight: '500'
            }}>Your one-stop platform for ranking everything!</p>
        </div>
    );
};

export default HomeTitle;