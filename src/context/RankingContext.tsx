import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleRankingsInitial } from '../data/sampleRankingsInitial';
import type { RankingModel, UserSubmission } from '../models/Ranking';
import { processSubmission, validateSubmission } from '../utils/scoringUtils';
import { getCachedUserId } from '../utils/userUtils';
import { fetchRankings as fetchFromFirestore, submitRanking as submitToFirestore, initializeSampleData, deleteSubmission as deleteFromFirestore } from '../services/firestoreService';

interface RankingContextValue {
    rankings: RankingModel[];
    setRankings: React.Dispatch<React.SetStateAction<RankingModel[]>>;
    submitRanking: (rankingId: string, submission: UserSubmission) => Promise<boolean>;
    deleteSubmission: (rankingId: string) => Promise<boolean>;
    currentUserId: string;
}

const RankingContext = createContext<RankingContextValue | undefined>(undefined);

export const RankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rankings, setRankings] = useState<RankingModel[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize user ID and load rankings on mount
    useEffect(() => {
        const init = async () => {
            try {
                // Get user ID from IP address
                const userId = await getCachedUserId();
                setCurrentUserId(userId);

                // Load rankings from Firestore
                let firestoreRankings = await fetchFromFirestore();
                
                if (firestoreRankings.length === 0) {
                    // If no data in Firestore, seed with sample data
                    console.log('Seeding Firestore with sample data...');
                    await initializeSampleData(sampleRankingsInitial);
                    firestoreRankings = await fetchFromFirestore();
                }
                
                setRankings(firestoreRankings);
                setError(null);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load rankings from Firebase';
                console.error('Error initializing rankings:', err);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    const submitRanking = async (rankingId: string, submission: UserSubmission): Promise<boolean> => {
        // Validate submission
        if (!validateSubmission(submission)) {
            console.error('Invalid submission');
            return false;
        }

        const ranking = rankings.find(r => r.id === rankingId);
        if (!ranking) {
            console.error('Ranking not found');
            return false;
        }

        // Check if user has already voted
        if (ranking.votes.includes(currentUserId)) {
            console.error('User has already voted');
            return false;
        }

        try {
            // Submit to Firestore
            const success = await submitToFirestore(rankingId, currentUserId, submission);
            
            if (success) {
                // Update local state
                const updatedRanking = processSubmission(ranking, submission);
                setRankings(prevRankings =>
                    prevRankings.map(r => r.id === rankingId ? updatedRanking : r)
                );
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error submitting ranking:', error);
            return false;
        }
    };

    const deleteSubmission = async (rankingId: string): Promise<boolean> => {
        try {
            // Delete from Firestore
            const success = await deleteFromFirestore(rankingId, currentUserId);
            
            if (success) {
                // Refresh rankings from Firestore to get updated data
                const updatedRankings = await fetchFromFirestore();
                setRankings(updatedRankings);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting submission:', error);
            return false;
        }
    };

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'var(--bg)'
            }}>
                <p style={{ color: 'var(--text)' }}>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'var(--bg)',
                padding: '2rem'
            }}>
                <div style={{
                    textAlign: 'center',
                    color: 'var(--destructive)',
                    backgroundColor: 'var(--surface)',
                    padding: '2rem',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow-lg)',
                    maxWidth: '500px'
                }}>
                    <h1 style={{ marginTop: 0, color: 'var(--destructive)' }}>Error Loading Rankings</h1>
                    <p>{error}</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Please check your Firebase configuration and try refreshing the page.</p>
                </div>
            </div>
        );
    }

    return (
        <RankingContext.Provider value={{ rankings, setRankings, submitRanking, deleteSubmission, currentUserId }}>
            {children}
        </RankingContext.Provider>
    );
};

export const useRankingContext = () => {
    const context = useContext(RankingContext);
    if (!context) {
        throw new Error('useRankingContext must be used within a RankingProvider');
    }
    return context;
};