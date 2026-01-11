import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { RankingModel, UserSubmission } from '../models/Ranking';

const RANKINGS_COLLECTION = 'rankings';

/**
 * Fetch all rankings from Firestore
 */
export const fetchRankings = async (): Promise<RankingModel[]> => {
    try {
        const snapshot = await getDocs(collection(db, RANKINGS_COLLECTION));
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                lastVoted: data.lastVoted?.toDate?.() || new Date(0),
                suggestions: (data.suggestions || []).map((s: any) => ({
                    ...s,
                    submittedAt: s.submittedAt?.toDate?.() || new Date(s.submittedAt),
                })),
            } as RankingModel;
        });
    } catch (error) {
        console.error('Error fetching rankings:', error);
        return [];
    }
};

/**
 * Fetch a single ranking by ID
 */
export const fetchRankingById = async (id: string): Promise<RankingModel | null> => {
    try {
        const docRef = doc(db, RANKINGS_COLLECTION, id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) return null;
        const data = snapshot.data();
        return {
            id: snapshot.id,
            ...data,
            lastVoted: data.lastVoted?.toDate?.() || new Date(0),
            suggestions: (data.suggestions || []).map((s: any) => ({
                ...s,
                submittedAt: s.submittedAt?.toDate?.() || new Date(s.submittedAt),
            })),
        } as RankingModel;
    } catch (error) {
        console.error('Error fetching ranking:', error);
        return null;
    }
};

/**
 * Submit a ranking (add/update user submission)
 */
export const submitRanking = async (
    rankingId: string,
    userId: string,
    submission: UserSubmission
): Promise<boolean> => {
    try {
        const docRef = doc(db, RANKINGS_COLLECTION, rankingId);
        const snapshot = await getDoc(docRef);
        
        if (!snapshot.exists()) {
            console.error('Ranking not found');
            return false;
        }

        const ranking = snapshot.data() as RankingModel;
        
        // Check if user already voted
        if (ranking.votes.includes(userId)) {
            console.error('User has already voted');
            return false;
        }
        
        // Check if user already submitted
        const existingIndex = ranking.submissions.findIndex(s => s.userId === userId);
        
        if (existingIndex >= 0) {
            // Update existing submission
            ranking.submissions[existingIndex] = submission;
        } else {
            // Add new submission
            ranking.submissions.push(submission);
            // Add user to votes array
            ranking.votes.push(userId);
        }

        // Recalculate aggregate scores
        ranking.options = recalculateScores(ranking.options, ranking.submissions);
        
        await updateDoc(docRef, {
            votes: ranking.votes,
            submissions: ranking.submissions,
            options: ranking.options,
            lastVoted: new Date(),
        });

        return true;
    } catch (error) {
        console.error('Error submitting ranking:', error);
        return false;
    }
};

/**
 * Recalculate aggregate scores for options based on submissions
 */
const recalculateScores = (
    options: RankingModel['options'],
    submissions: UserSubmission[]
): RankingModel['options'] => {
    // Reset scores
    const updatedOptions = options.map(opt => ({
        ...opt,
        totalScore: 0,
        submissionCount: 0,
        firstPlaceCount: 0,
        secondPlaceCount: 0,
        thirdPlaceCount: 0,
    }));

    // Calculate scores from submissions
    submissions.forEach(submission => {
        submission.rankedOptions.forEach(rankedOpt => {
            const option = updatedOptions.find(o => o.id === rankedOpt.optionId);
            if (option) {
                const points = getPointsForPosition(rankedOpt.position);
                option.totalScore += points;
                option.submissionCount += 1;

                if (rankedOpt.position === 1) option.firstPlaceCount += 1;
                else if (rankedOpt.position === 2) option.secondPlaceCount += 1;
                else if (rankedOpt.position === 3) option.thirdPlaceCount += 1;
            }
        });
    });

    return updatedOptions;
};

/**
 * Get points based on ranking position
 */
const getPointsForPosition = (position: number): number => {
    const points: { [key: number]: number } = {
        1: 3,
        2: 2,
        3: 1,
    };
    return points[position] || 0;
};

/**
 * Initialize Firestore with sample data (run once)
 */
export const initializeSampleData = async (sampleRankings: RankingModel[]): Promise<void> => {
    try {
        for (const ranking of sampleRankings) {
            const docRef = doc(db, RANKINGS_COLLECTION, ranking.id);
            await setDoc(docRef, ranking);
        }
        console.log('Sample data initialized');
    } catch (error) {
        console.error('Error initializing sample data:', error);
    }
};

/**
 * Submit a suggestion for a new option
 */
export const submitSuggestion = async (
    rankingId: string,
    userId: string,
    optionTitle: string
): Promise<boolean> => {
    try {
        const docRef = doc(db, RANKINGS_COLLECTION, rankingId);
        const snapshot = await getDoc(docRef);
        
        if (!snapshot.exists()) {
            console.error('Ranking not found');
            return false;
        }

        const ranking = snapshot.data() as RankingModel;
        
        // Create new suggestion
        const newSuggestion = {
            id: `suggestion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            optionTitle: optionTitle.trim(),
            userId,
            submittedAt: new Date(),
        };

        // Add suggestion to array
        const suggestions = ranking.suggestions || [];
        suggestions.push(newSuggestion);

        await updateDoc(docRef, {
            suggestions,
        });

        return true;
    } catch (error) {
        console.error('Error submitting suggestion:', error);
        return false;
    }
};

/**
 * Delete a user's submission from a ranking
 */
export const deleteSubmission = async (
    rankingId: string,
    userId: string
): Promise<boolean> => {
    try {
        const docRef = doc(db, RANKINGS_COLLECTION, rankingId);
        const snapshot = await getDoc(docRef);
        
        if (!snapshot.exists()) {
            console.error('Ranking not found');
            return false;
        }

        const ranking = snapshot.data() as RankingModel;
        
        // Remove user from votes array
        const votes = ranking.votes.filter(v => v !== userId);
        
        // Remove user's submission
        const submissions = ranking.submissions.filter(s => s.userId !== userId);
        
        // Recalculate scores without this user's submission
        const options = recalculateScores(ranking.options, submissions);

        await updateDoc(docRef, {
            votes,
            submissions,
            options,
        });

        return true;
    } catch (error) {
        console.error('Error deleting submission:', error);
        return false;
    }
};
