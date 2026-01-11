import React from 'react';
import { FaGripVertical, FaTrophy, FaMedal } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tooltip } from '@mui/material';

interface SortableItemProps {
    id: string;
    title: string;
    rank: number;
    totalScore: number;
    submissionCount: number;
    firstPlaceCount: number;
    secondPlaceCount: number;
    thirdPlaceCount: number;
    isTopThree: boolean;
    dragDisabled: boolean;
    dragHandleOnly?: boolean;
    sortView: 'yours' | 'community';
}

const SortableItem: React.FC<SortableItemProps> = ({ 
    id, 
    title, 
    rank, 
    totalScore,
    submissionCount,
    firstPlaceCount,
    secondPlaceCount,
    thirdPlaceCount,
    isTopThree,
    dragDisabled,
    dragHandleOnly = false,
    sortView,
}) => {
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, disabled: dragDisabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getRankBadgeStyle = () => {
        // Show colors in "yours" view or when there are actual submissions in "community" view
        if (!isTopThree && sortView !== 'yours') return {};
        if (sortView !== 'yours' && rank > 3) return {};
        
        switch(rank) {
            case 1:
                return { 
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4)'
                };
            case 2:
                return { 
                    background: 'linear-gradient(135deg, #C0C0C0, #808080)',
                    boxShadow: '0 2px 8px rgba(192, 192, 192, 0.4)'
                };
            case 3:
                return { 
                    background: 'linear-gradient(135deg, #CD7F32, #8B4513)',
                    boxShadow: '0 2px 8px rgba(205, 127, 50, 0.4)'
                };
            default:
                return {};
        }
    };

    const getScoreBreakdown = () => {
        return (
            <div style={{ fontSize: '0.875rem' }}>
                <div><strong>Total Score:</strong> {totalScore} pts</div>
                <div><strong>Submissions:</strong> {submissionCount}</div>
                <div>🥇 1st Place: {firstPlaceCount}</div>
                <div>🥈 2nd Place: {secondPlaceCount}</div>
                <div>🥉 3rd Place: {thirdPlaceCount}</div>
            </div>
        );
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`ranking-option ${isDragging ? 'dragging' : ''} ${isTopThree ? 'top-three' : ''} ${dragDisabled ? 'drag-disabled' : ''}`}
            {...(!dragDisabled && !dragHandleOnly ? { ...attributes, ...listeners } : {})}
        >
            <div className="rank-badge" style={getRankBadgeStyle()}>
                {(isTopThree || (sortView === 'yours' && rank === 1)) && rank === 1 && <FaTrophy className="trophy-icon" />}
                {(isTopThree || (sortView === 'yours' && rank === 2)) && rank === 2 && <FaMedal className="trophy-icon" />}
                {(isTopThree || (sortView === 'yours' && rank === 3)) && rank === 3 && <FaMedal className="trophy-icon" />}
                <span className="rank-number">{submissionCount > 0 || sortView === 'yours' ? `#${rank}` : '-'}</span>
            </div>
            <div className="option-content">
                <div className="option-title">{title}</div>
                <div className="option-votes">
                    {submissionCount > 0 ? (
                        <Tooltip title={getScoreBreakdown()} arrow>
                            <span style={{ cursor: 'help' }}>
                                {totalScore} pts • {submissionCount} submissions
                            </span>
                        </Tooltip>
                    ) : (
                        <span>No votes yet</span>
                    )}
                </div>
            </div>
            <div
                className="drag-handle"
                ref={!dragDisabled && dragHandleOnly ? setActivatorNodeRef : undefined}
                {...(!dragDisabled && dragHandleOnly ? { ...attributes, ...listeners } : {})}
            >
                <FaGripVertical />
            </div>
        </div>
    );
};

export default SortableItem;