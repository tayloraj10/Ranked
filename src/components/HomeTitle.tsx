import React from 'react';
import { APP_NAME, APP_TAGLINE } from '../config/constants';

const HomeTitle: React.FC = () => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '.5em',
            background: 'var(--gradient-primary)',
            boxShadow: 'var(--shadow-lg)',
            color: 'white',
            borderRadius: '6px',
        }}>
            <h1 style={{
                margin: '0',
                fontSize: '1.75rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
            }}>Welcome to {APP_NAME}</h1>
            <p style={{
                margin: '0',
                fontSize: '1rem',
                fontWeight: '500',
                opacity: '0.95',
                letterSpacing: '-0.01em'
            }}>{APP_TAGLINE}</p>
        </div>
    );
};

export default HomeTitle;