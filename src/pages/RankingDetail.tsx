import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRankingContext } from '../context/RankingContext';
import Ranking from '../components/Ranking';
import Header from '../components/Header';
import { IconButton } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';

const RankingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { rankings } = useRankingContext();
    
    const ranking = rankings.find(r => r.id === id);

    // if (!ranking) {
    //     return (
    //         <div style={{ 
    //             padding: '3em 2em', 
    //             textAlign: 'center', 
    //             background: '#fff', 
    //             borderRadius: '12px', 
    //             boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
    //             margin: '2em auto', 
    //             maxWidth: '600px',
    //             border: '1px solid #e0e0e0'
    //         }}>
    //             <h2 style={{ margin: 0, color: '#333' }}>Ranking not found</h2>
    //         </div>
    //     );
    // }

    const handleToggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
