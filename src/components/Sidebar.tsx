import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRankingContext } from '../context/RankingContext';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import './Sidebar.css';
import { FaArrowLeft, FaVoteYea, FaTrophy } from 'react-icons/fa';


interface SidebarProps {
    isDrawerOpen: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isDrawerOpen, toggleDrawer }) => {
    const { rankings } = useRankingContext();
    const navigate = useNavigate();

    const handleRankingClick = (rankingId: string) => {
        navigate(`/ranking/${rankingId}`);
        toggleDrawer(false)({} as React.MouseEvent);
    };

    const getWinningOption = (ranking: typeof rankings[0]) => {
        if (!ranking.votes || ranking.votes.length === 0) return null;
        
        const sorted = [...ranking.options].sort((a, b) => {
            if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
            if (b.firstPlaceCount !== a.firstPlaceCount) return b.firstPlaceCount - a.firstPlaceCount;
            return b.secondPlaceCount - a.secondPlaceCount;
        });
        
        return sorted[0];
    };

    return (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            <div className="sidebar-content">
                <h2 className="sidebar-title">Recent Rankings</h2>
                <ul className="sidebar-list">
                    {rankings
                        .sort((a, b) => new Date(b.lastVoted).getTime() - new Date(a.lastVoted).getTime())
                        .slice(0, 10)
                        .map((ranking) => {
                            const winner = getWinningOption(ranking);
                            return (
                                <li key={ranking.id} className="sidebar-list-item">
                                    <a 
                                        href="#" 
                                        className="sidebar-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRankingClick(ranking.id);
                                        }}
                                    >
                                        {ranking.title}
                                    </a>
                                    <div className="sidebar-meta">
                                        {winner && (
                                            <Tooltip title={`Leading with ${winner.totalScore} points`} arrow>
                                                <div className="winning-badge">
                                                    <FaTrophy /> <span>{winner.title}</span>
                                                </div>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Total votes" arrow>
                                            <div className="votes-badge">
                                                <FaVoteYea /> <span>{ranking.votes?.length || 0}</span>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                <button className="create-list-button" onClick={toggleDrawer(false)}>
                    <span className="icon-left"><FaArrowLeft /></span>
                </button>
            </div>
        </Drawer>
    );
};

export default Sidebar;