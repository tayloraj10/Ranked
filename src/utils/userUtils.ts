/**
 * Get user ID based on IP address
 * Falls back to a random ID if IP fetching fails
 */
export const getUserId = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip || generateFallbackId();
    } catch (error) {
        console.warn('Failed to fetch IP, using fallback ID:', error);
        return generateFallbackId();
    }
};

/**
 * Generate a fallback ID if IP fetching fails
 * Stores it in localStorage for consistency within the same browser
 */
const generateFallbackId = (): string => {
    const storedId = localStorage.getItem('userId');
    if (storedId) return storedId;

    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', newId);
    return newId;
};

/**
 * Get cached user ID or fetch a new one
 */
let cachedUserId: string | null = null;

export const getCachedUserId = async (): Promise<string> => {
    if (cachedUserId) return cachedUserId;
    cachedUserId = await getUserId();
    return cachedUserId;
};
