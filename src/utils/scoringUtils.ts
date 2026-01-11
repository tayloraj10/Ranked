import type { UserSubmission, OptionModel, RankingModel } from '../models/Ranking';

/**
 * Calculate points for a position using Simple Position scoring:
 * 1st place = 3 points
 * 2nd place = 2 points
 * 3rd place = 1 point
 * 4th+ place = 0 points
 */
export const getPointsForPosition = (position: number): number => {
    switch (position) {
        case 1:
            return 3;
        case 2:
            return 2;
        case 3:
            return 1;
        default:
            return 0;
    }
};

/**
 * Process a user submission and update option scores
 */
export const processSubmission = (
    ranking: RankingModel,
    submission: UserSubmission
): RankingModel => {
    const updatedOptions = ranking.options.map(option => {
        const rankedOption = submission.rankedOptions.find(
            ro => ro.optionId === option.id
        );

        if (!rankedOption) {
            return option; // Option wasn't ranked by this user
        }

        const points = getPointsForPosition(rankedOption.position);
        
        return {
            ...option,
            totalScore: option.totalScore + points,
            submissionCount: option.submissionCount + 1,
            firstPlaceCount: rankedOption.position === 1 
                ? option.firstPlaceCount + 1 
                : option.firstPlaceCount,
            secondPlaceCount: rankedOption.position === 2 
                ? option.secondPlaceCount + 1 
                : option.secondPlaceCount,
            thirdPlaceCount: rankedOption.position === 3 
                ? option.thirdPlaceCount + 1 
                : option.thirdPlaceCount,
        };
    });

    return {
        ...ranking,
        options: updatedOptions,
        submissions: [...ranking.submissions, submission],
        votes: [...ranking.votes, submission.userId],
        lastVoted: submission.submittedAt,
    };
};

/**
 * Sort options by total score (highest first)
 */
export const getSortedOptions = (options: OptionModel[]): OptionModel[] => {
    return [...options].sort((a, b) => {
        // Primary sort: by total score
        if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore;
        }
        // Tiebreaker: by first place count
        if (b.firstPlaceCount !== a.firstPlaceCount) {
            return b.firstPlaceCount - a.firstPlaceCount;
        }
        // Second tiebreaker: by second place count
        return b.secondPlaceCount - a.secondPlaceCount;
    });
};

/**
 * Calculate average score for an option
 */
export const getAverageScore = (option: OptionModel): number => {
    if (option.submissionCount === 0) return 0;
    return option.totalScore / option.submissionCount;
};

/**
 * Check if user has already submitted to this ranking
 */
export const hasUserVoted = (ranking: RankingModel, userId: string): boolean => {
    return ranking.votes.includes(userId);
};

/**
 * Validate a submission (max 3 options, valid positions)
 */
export const validateSubmission = (submission: UserSubmission): boolean => {
    if (submission.rankedOptions.length === 0 || submission.rankedOptions.length > 3) {
        return false;
    }

    // Check for duplicate positions
    const positions = submission.rankedOptions.map(ro => ro.position);
    const uniquePositions = new Set(positions);
    if (positions.length !== uniquePositions.size) {
        return false;
    }

    // Check for duplicate options
    const optionIds = submission.rankedOptions.map(ro => ro.optionId);
    const uniqueOptionIds = new Set(optionIds);
    if (optionIds.length !== uniqueOptionIds.size) {
        return false;
    }

    // Check positions are 1, 2, or 3
    return positions.every(pos => pos >= 1 && pos <= 3);
};
