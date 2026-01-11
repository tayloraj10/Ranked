import React from 'react';
import { useParams } from 'react-router-dom';
import { useRankingContext } from '../context/RankingContext';
import FeaturedRankings from './FeaturedRankings';
import Ranking from './Ranking';
import './MainContent.css';


const MainContent: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const { rankings } = useRankingContext();

    const ranking = id ? rankings.find(r => r.id === id) : undefined;

    return (
        <main className="main-content">
            {id ? (
                ranking ? (
                    <Ranking ranking={ranking} />
                ) : (
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
                )
            ) : (
                <FeaturedRankings />
            )}
        </main>
    );
};

export default MainContent;