import React from 'react';
import { useRankingContext } from '../context/RankingContext';
import Ranking from './Ranking';
import './FeaturedRankings.css';

const FeaturedRankings: React.FC = () => {
    const { rankings } = useRankingContext();
    const featuredRankings = rankings.filter((ranking: { featured: boolean }) => ranking.featured);

    return (
        <>
            <h2 className="featured-rankings-title">
                Featured Ranking
            </h2>
            {featuredRankings.map((ranking: any, index: number) => (
                <Ranking key={index} ranking={ranking} />
            ))}
        </>
    );
};

export default FeaturedRankings;