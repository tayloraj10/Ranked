export interface OptionModel {
    id: string; // Unique identifier for the option
    title: string; // Title of the option
    userId: string; // ID of the user who added the option
    votes: number; // Number of votes the option has received
}

export interface RankingModel {
    id: string; // Unique identifier for the ranking
    title: string; // Title of the ranking
    options: OptionModel[]; // List of options for the ranking
    featured: boolean; // Indicates if the ranking is prioritized
    lastVoted: Date; // Optional timestamp of the last vote
    votes: string[]; // Array of user IDs who have voted in this ranking
}

