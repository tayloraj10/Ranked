export interface OptionModel {
    id: string;
    title: string;
    userId: string;
    totalScore: number;
    submissionCount: number;
    firstPlaceCount: number;
    secondPlaceCount: number;
    thirdPlaceCount: number;
}

export interface RankingModel {
    id: string; // Unique identifier for the ranking
    title: string; // Title of the ranking
    options: OptionModel[]; // List of options for the ranking
    featured: boolean; // Indicates if the ranking is prioritized
    lastVoted: Date; // Optional timestamp of the last vote
    votes: string[]; // Array of user IDs who have voted in this ranking
    submissions: UserSubmission[]; // All user submissions for this ranking
}

export interface UserSubmission {
    id: string; // Unique identifier for the submission
    userId: string; // ID of the user who submitted
    rankingId: string; // ID of the ranking this submission is for
    rankedOptions: RankedOption[]; // User's ordered choices (max 3)
    submittedAt: Date; // When the submission was made
}

export interface RankedOption {
    optionId: string; // ID of the option
    position: number; // Position in user's ranking (1, 2, or 3)
}

