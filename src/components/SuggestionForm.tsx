import React, { useState } from 'react';
import './SuggestionForm.css';

interface SuggestionFormProps {
    onSubmit: (optionTitle: string) => Promise<boolean>;
}

export const SuggestionForm: React.FC<SuggestionFormProps> = ({ onSubmit }) => {
    const [optionTitle, setOptionTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!optionTitle.trim()) {
            setMessage({ type: 'error', text: 'Please enter an option' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        const success = await onSubmit(optionTitle.trim());
        
        if (success) {
            setMessage({ type: 'success', text: 'Suggestion submitted successfully!' });
            setOptionTitle('');
        } else {
            setMessage({ type: 'error', text: 'Failed to submit suggestion. Please try again.' });
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="suggestion-form-container">
            <h3 className="suggestion-form-title">Suggest a New Option</h3>
            <form onSubmit={handleSubmit} className="suggestion-form">
                <input
                    type="text"
                    value={optionTitle}
                    onChange={(e) => setOptionTitle(e.target.value)}
                    placeholder="Enter option name..."
                    className="suggestion-input"
                    disabled={isSubmitting}
                    maxLength={100}
                />
                <button 
                    type="submit" 
                    className="suggestion-submit-btn"
                    disabled={isSubmitting || !optionTitle.trim()}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
                </button>
            </form>
            {message && (
                <div className={`suggestion-message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};
