import React, { useEffect, useState } from 'react';
import './Ranking.css';
import SortableItem from './SortableItem';
import type { RankingModel } from '../models/Ranking';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface RankingProps {
    ranking: RankingModel;
}


const Ranking: React.FC<RankingProps> = ({ ranking }) => {
    const [options, setOptions] = useState(ranking.options);

    useEffect(() => {
        setOptions(ranking.options);
    }, [ranking.id]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setOptions((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="ranking-container">
            <h3 className="ranking-title">{ranking.title}</h3>
            <p className="ranking-subtitle">Drag to reorder • {ranking.votes.length} total voters</p>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={options.map((option) => option.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="ranking-options">
                        {options.map((option, index) => (
                            <SortableItem
                                key={option.id}
                                id={option.id}
                                title={option.title}
                                votes={option.votes}
                                rank={index + 1}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default Ranking;