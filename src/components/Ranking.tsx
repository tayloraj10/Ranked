import React, { useEffect, useState } from 'react';
import './Ranking.css';
import SortableItem from './SortableItem';
import type { RankingModel, UserSubmission, RankedOption } from '../models/Ranking';
import { useRankingContext } from '../context/RankingContext';
import { getSortedOptions, hasUserVoted } from '../utils/scoringUtils';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Alert, Snackbar, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface RankingProps {
    ranking: RankingModel;
}

type SortView = 'yours' | 'community';


const Ranking: React.FC<RankingProps> = ({ ranking }) => {
    const { submitRanking, currentUserId } = useRankingContext();
    const [sortView, setSortView] = useState<SortView>('community');
    const [draftOptions, setDraftOptions] = useState(ranking.options);
    const [displayOptions, setDisplayOptions] = useState(ranking.options);
    const [hasVoted, setHasVoted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const userSubmission = ranking.submissions.find(s => s.userId === currentUserId);

    const buildUserOrder = (): typeof ranking.options => {
        if (!userSubmission) return draftOptions;

        const topIds = [...userSubmission.rankedOptions]
            .sort((a, b) => a.position - b.position)
            .map(ro => ro.optionId);

        const byId = new Map(ranking.options.map(o => [o.id, o] as const));
        const top = topIds.map(id => byId.get(id)).filter(Boolean) as typeof ranking.options;
        const remaining = ranking.options.filter(o => !topIds.includes(o.id));
        return [...top, ...remaining];
    };

    const syncDisplayOptions = (nextSortView: SortView, nextHasVoted: boolean) => {
        if (nextSortView === 'community') {
            setDisplayOptions(getSortedOptions(ranking.options));
            return;
        }

        if (nextHasVoted) {
            setDisplayOptions(buildUserOrder());
            return;
        }

        setDisplayOptions(draftOptions);
    };

    useEffect(() => {
        // Reset per-ranking state
        const nextHasVoted = hasUserVoted(ranking, currentUserId);
        setHasVoted(nextHasVoted);
        setDraftOptions(ranking.options);

        // Default view: show community results first.
        const nextSortView: SortView = 'community';
        setSortView(nextSortView);

        // Show the right list on load
        if (nextSortView === 'community') {
            setDisplayOptions(getSortedOptions(ranking.options));
        } else {
            setDisplayOptions(nextHasVoted ? buildUserOrder() : ranking.options);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ranking.id, currentUserId]);

    useEffect(() => {
        // When scores change (after submissions), refresh what we're showing.
        syncDisplayOptions(sortView, hasVoted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ranking.options, ranking.submissions, sortView, hasVoted]);

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
        if (hasVoted || sortView !== 'yours') return;
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setDraftOptions((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const updated = arrayMove(items, oldIndex, newIndex);
                setDisplayOptions(updated);
                return updated;
            });
        }
    };

    const handleSubmit = () => {
        if (sortView !== 'yours') {
            setErrorMessage('Switch to “Your ranking” to submit.');
            setShowError(true);
            return;
        }

        // Only take top 3 ranked items
        const top3 = draftOptions.slice(0, 3);
        
        if (top3.length === 0) {
            setErrorMessage('Please rank at least one option');
            setShowError(true);
            return;
        }

        const rankedOptions: RankedOption[] = top3.map((option, index) => ({
            optionId: option.id,
            position: index + 1, // 1st, 2nd, 3rd
        }));

        const submission: UserSubmission = {
            id: `submission_${Date.now()}`,
            userId: currentUserId,
            rankingId: ranking.id,
            rankedOptions,
            submittedAt: new Date(),
        };

        const success = submitRanking(ranking.id, submission);
        
        if (success) {
            setShowSuccess(true);
            setHasVoted(true);
            setSortView('community');
            syncDisplayOptions('community', true);
        } else {
            setErrorMessage('Failed to submit ranking. You may have already voted.');
            setShowError(true);
        }
    };

    const handleSortViewChange = (_event: React.MouseEvent<HTMLElement>, value: SortView | null) => {
        if (!value) return;
        setSortView(value);
        syncDisplayOptions(value, hasVoted);
    };

    const dragDisabled = hasVoted || sortView !== 'yours';

    return (
        <div className="ranking-container">
            <div className="ranking-header">
                <div>
                    <h3 className="ranking-title">{ranking.title}</h3>
                    <p className="ranking-subtitle">
                        {hasVoted 
                            ? <span><span style={{ color: 'green' }}>✓</span> You've voted • {ranking.votes.length} total voters</span>
                            : sortView === 'community'
                                ? `Switch to "Your ranking" to vote • ${ranking.votes.length} voters`
                                : `Drag to rank your top 3 • ${ranking.votes.length} voters`
                        }
                    </p>
                </div>
                <div className="ranking-controls">
                    <ToggleButtonGroup
                        value={sortView}
                        exclusive
                        onChange={handleSortViewChange}
                        size="small"
                        color="primary"
                        sx={{ 
                            width: { xs: '100%', sm: 'auto' },
                            '& .MuiToggleButton-root': {
                                fontSize: '0.875rem',
                                padding: { xs: '0.5em 1em', sm: '0.5em 1em' }
                            }
                        }}
                    >
                        <ToggleButton value="yours">Your ranking</ToggleButton>
                        <ToggleButton value="community">Community</ToggleButton>
                    </ToggleButtonGroup>

                    {!hasVoted && (
                    <div className="submit-section">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            onClick={handleSubmit}
                            disabled={sortView !== 'yours'}
                            sx={{ 
                                padding: { xs: '0.65em 1.5em', sm: '0.75em 2em' },
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                fontWeight: 'bold',
                                width: { xs: '100%', sm: 'auto' }
                            }}
                        >
                            Submit My Rankings
                        </Button>
                        <p className="scoring-info">
                            <span className="scoring-mobile">1st=3pts • 2nd=2pts • 3rd=1pt</span>
                            <span className="scoring-desktop">1st place = 3 pts • 2nd place = 2 pts • 3rd place = 1 pt</span>
                        </p>
                    </div>
                    )}

                    {hasVoted && sortView === 'yours' && userSubmission && (
                        <p className="user-submission-note">
                            Showing what you submitted.
                        </p>
                    )}
                </div>
            </div>
            
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={displayOptions.map((option) => option.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="ranking-options">
                        {displayOptions.map((option, index) => {
                            // Calculate actual rank considering ties
                            let actualRank = index + 1;
                            let isTied = false;
                            
                            if (sortView === 'community' && index > 0) {
                                const prevOption = displayOptions[index - 1];
                                if (prevOption.totalScore === option.totalScore &&
                                    prevOption.firstPlaceCount === option.firstPlaceCount &&
                                    prevOption.secondPlaceCount === option.secondPlaceCount) {
                                    // Find the rank of the first item in this tie group
                                    let tieStartIndex = index - 1;
                                    while (tieStartIndex > 0) {
                                        const evenEarlier = displayOptions[tieStartIndex - 1];
                                        if (evenEarlier.totalScore === option.totalScore &&
                                            evenEarlier.firstPlaceCount === option.firstPlaceCount &&
                                            evenEarlier.secondPlaceCount === option.secondPlaceCount) {
                                            tieStartIndex--;
                                        } else {
                                            break;
                                        }
                                    }
                                    actualRank = tieStartIndex + 1;
                                    isTied = actualRank <= 3; // Only show "tied" for top 3
                                }
                            }
                            
                            return (
                                <SortableItem
                                    key={option.id}
                                    id={option.id}
                                    title={option.title}
                                    rank={actualRank}
                                    totalScore={option.totalScore}
                                    submissionCount={option.submissionCount}
                                    firstPlaceCount={option.firstPlaceCount}
                                    secondPlaceCount={option.secondPlaceCount}
                                    thirdPlaceCount={option.thirdPlaceCount}
                                    isTopThree={actualRank <= 3}
                                    dragDisabled={dragDisabled}
                                    isTied={isTied}
                                />
                            );
                        })}
                    </div>
                </SortableContext>
            </DndContext>

            <Snackbar 
                open={showSuccess} 
                autoHideDuration={4000} 
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Your rankings have been submitted!
                </Alert>
            </Snackbar>

            <Snackbar 
                open={showError} 
                autoHideDuration={4000} 
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Ranking;