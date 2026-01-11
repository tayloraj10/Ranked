import React from 'react';
import { useParams } from 'react-router-dom';
import { useRankingContext } from '../context/RankingContext';
import Ranking from '../components/Ranking';
import Header from '../components/Header';
import RankingNotFound from '../components/RankingNotFound';

const RankingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { rankings } = useRankingContext();
    
    const ranking = rankings.find(r => r.id === id);

    if (!ranking) {
        return (
            <RankingNotFound />
        );
    }

    const handleToggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header toggleDrawer={handleToggleDrawer} />
            <main
                style={{
                    flex: 1,
                    padding: '2em',
                    maxWidth: '900px',
                    margin: '0 auto',
                    width: '100%',
                }}
            >
             
                <Ranking ranking={ranking} />
            </main>
        </div>
    );
};

export default RankingDetail;
