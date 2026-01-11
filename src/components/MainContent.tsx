import React from 'react';
import { useParams } from 'react-router-dom';
import { useRankingContext } from '../context/RankingContext';
import FeaturedRankings from './FeaturedRankings';
import Ranking from './Ranking';
import './MainContent.css';
import RankingNotFound from './RankingNotFound';

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
                  <RankingNotFound />
                )
            ) : (
                <FeaturedRankings />
            )}
        </main>
    );
};

export default MainContent;