import React from 'react';

const RankingNotFound: React.FC = () => {
  return (
     <div style={{ 
                        padding: '3rem 2rem', 
                        textAlign: 'center',
                        background: 'var(--surface)',
                        borderRadius: '20px',
                        boxShadow: 'var(--shadow-lg)',
                        margin: '4rem auto',
                        maxWidth: '500px',
                        color: 'var(--text)',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{ 
                            fontSize: '1.75rem', 
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            marginBottom: '0.5rem',
                            color: 'var(--text)'
                        }}>Ranking not found</h2>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--text-secondary)',
                            margin: '0'
                        }}>The ranking you're looking for doesn't exist.</p>
                    </div>
  );
};

export default RankingNotFound;
