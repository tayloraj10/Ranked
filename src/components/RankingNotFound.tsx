import React from 'react';

const RankingNotFound: React.FC = () => {
  return (
     <div style={{ 
                        padding: '.5em', 
                        textAlign: 'center',
                        backgroundColor: 'var(--surface)',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        margin: '2em auto',
                       width: 'fit-content',
                       color: 'var(--text)',
                       border: '1px solid var(--muted)'
                    }}>
                        <h2>Ranking not found</h2>
                    </div>
  );
};

export default RankingNotFound;
