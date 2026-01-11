import React from 'react';
import type { OptionSuggestion } from '../models/Ranking';
import './SuggestionList.css';

interface SuggestionListProps {
    suggestions: OptionSuggestion[];
}

export const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions }) => {
    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    // Sort by most recent first
    const sortedSuggestions = [...suggestions].sort((a, b) => {
        const dateA = a.submittedAt instanceof Date ? a.submittedAt : new Date(a.submittedAt);
        const dateB = b.submittedAt instanceof Date ? b.submittedAt : new Date(b.submittedAt);
        return dateB.getTime() - dateA.getTime();
    });

    const formatDate = (date: Date | any) => {
        const actualDate = date instanceof Date ? date : new Date(date);
        return actualDate.toLocaleDateString();
    };

    return (
        <div className="suggestion-list-container">
            <h3 className="suggestion-list-title">
                Suggested Options ({suggestions.length})
            </h3>
            <div className="suggestion-list">
                {sortedSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="suggestion-item">
                        <div className="suggestion-content">
                            <span className="suggestion-option-title">
                                {suggestion.optionTitle}
                            </span>
                            <span className="suggestion-meta">
                                Suggested {formatDate(suggestion.submittedAt)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
