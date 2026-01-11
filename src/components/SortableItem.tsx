import React from 'react';
import { FaGripVertical, FaTrophy } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
    id: string;
    title: string;
    votes: number;
    rank: number;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, title, votes, rank }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`ranking-option ${isDragging ? 'dragging' : ''}`}
            {...attributes}
            {...listeners}
        >
            <div className="rank-badge">
                {rank === 1 && <FaTrophy className="trophy-icon" />}
                <span className="rank-number">#{rank}</span>
            </div>
            <div className="option-content">
                <div className="option-title">{title}</div>
                <div className="option-votes">{votes} votes</div>
            </div>
            <div className="drag-handle">
                <FaGripVertical />
            </div>
        </div>
    );
};

export default SortableItem;