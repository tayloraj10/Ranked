import React from 'react';
import FeaturedRankings from './FeaturedRankings';
import './MainContent.css';


const MainContent: React.FC = () => {
    return (
        <main className="main-content">
            <FeaturedRankings  />
        </main>
    );
};

export default MainContent;