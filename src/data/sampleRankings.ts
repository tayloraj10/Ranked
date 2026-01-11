import type { RankingModel } from "../models/Ranking";


export const sampleRankings: RankingModel[] = [
    {
        id: '1',
        title: 'Best Movies of 2025',
        featured: false,
        lastVoted: new Date('2024-06-15T10:00:00Z'),
        votes: ['community_a', 'community_b', 'community_c'],
        submissions: [
            {
                id: 'sub_1_a',
                userId: 'community_a',
                rankingId: '1',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-06-15T10:01:00Z'),
            },
            {
                id: 'sub_1_b',
                userId: 'community_b',
                rankingId: '1',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-06-15T10:03:00Z'),
            },
            {
                id: 'sub_1_c',
                userId: 'community_c',
                rankingId: '1',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '3', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-06-15T10:05:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Movie A', userId: 'user1', totalScore: 8, submissionCount: 3, firstPlaceCount: 2, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'Movie B', userId: 'user2', totalScore: 6, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 1 },
            { id: '3', title: 'Movie C', userId: 'user3', totalScore: 4, submissionCount: 3, firstPlaceCount: 0, secondPlaceCount: 1, thirdPlaceCount: 2 },
        ],
        suggestions: []
    },
    {
        id: '2',
        title: 'Top Programming Languages',
        featured: true,
        lastVoted: new Date('2024-06-20T15:30:00Z'),
        votes: ['community_a', 'community_b', 'community_c', 'community_d'],
        submissions: [
            {
                id: 'sub_2_a',
                userId: 'community_a',
                rankingId: '2',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-06-20T15:31:00Z'),
            },
            {
                id: 'sub_2_b',
                userId: 'community_b',
                rankingId: '2',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '6', position: 3 },
                ],
                submittedAt: new Date('2024-06-20T15:34:00Z'),
            },
            {
                id: 'sub_2_c',
                userId: 'community_c',
                rankingId: '2',
                rankedOptions: [
                    { optionId: '4', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '1', position: 3 },
                ],
                submittedAt: new Date('2024-06-20T15:37:00Z'),
            },
            {
                id: 'sub_2_d',
                userId: 'community_d',
                rankingId: '2',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '4', position: 2 },
                    { optionId: '5', position: 3 },
                ],
                submittedAt: new Date('2024-06-20T15:39:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'JavaScript', userId: 'user4', totalScore: 6, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 1 },
            { id: '2', title: 'Python', userId: 'user5', totalScore: 10, submissionCount: 4, firstPlaceCount: 2, secondPlaceCount: 2, thirdPlaceCount: 0 },
            { id: '3', title: 'Rust', userId: 'user6', totalScore: 0, submissionCount: 0, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 0 },
            { id: '4', title: 'TypeScript', userId: 'user50', totalScore: 6, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 1 },
            { id: '5', title: 'Go', userId: 'user51', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '6', title: 'Java', userId: 'user52', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '7', title: 'C++', userId: 'user53', totalScore: 0, submissionCount: 0, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 0 },
            { id: '8', title: 'C#', userId: 'user54', totalScore: 0, submissionCount: 0, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 0 },
        ],
        suggestions: []
    },
    {
        id: '3',
        title: 'Favorite Books',
        featured: false,
        lastVoted: new Date('2024-06-10T12:00:00Z'),
        votes: ['community_a', 'community_b'],
        submissions: [
            {
                id: 'sub_3_a',
                userId: 'community_a',
                rankingId: '3',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-06-10T12:02:00Z'),
            },
            {
                id: 'sub_3_b',
                userId: 'community_b',
                rankingId: '3',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-06-10T12:05:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Book X', userId: 'user7', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'Book Y', userId: 'user8', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '3', title: 'Book Z', userId: 'user9', totalScore: 2, submissionCount: 2, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 2 },
        ],
        suggestions: []
    },
    {
        id: '4',
        title: 'Best Pizza Toppings',
        featured: false,
        lastVoted: new Date('2024-07-01T18:45:00Z'),
        votes: ['community_a', 'community_b', 'community_c'],
        submissions: [
            {
                id: 'sub_4_a',
                userId: 'community_a',
                rankingId: '4',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '3', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-07-01T18:46:00Z'),
            },
            {
                id: 'sub_4_b',
                userId: 'community_b',
                rankingId: '4',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-07-01T18:48:00Z'),
            },
            {
                id: 'sub_4_c',
                userId: 'community_c',
                rankingId: '4',
                rankedOptions: [
                    { optionId: '3', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-07-01T18:50:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Pepperoni', userId: 'user10', totalScore: 7, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 2, thirdPlaceCount: 0 },
            { id: '2', title: 'Mushrooms', userId: 'user11', totalScore: 5, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 0, thirdPlaceCount: 2 },
            { id: '3', title: 'Extra Cheese', userId: 'user12', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '4', title: 'Pineapple', userId: 'user13', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
    {
        id: '5',
        title: 'Top Vacation Destinations',
        featured: false,
        lastVoted: new Date('2024-06-25T09:15:00Z'),
        votes: ['community_a', 'community_b', 'community_c'],
        submissions: [
            {
                id: 'sub_5_a',
                userId: 'community_a',
                rankingId: '5',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '3', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-06-25T09:16:00Z'),
            },
            {
                id: 'sub_5_b',
                userId: 'community_b',
                rankingId: '5',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-06-25T09:18:00Z'),
            },
            {
                id: 'sub_5_c',
                userId: 'community_c',
                rankingId: '5',
                rankedOptions: [
                    { optionId: '3', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '1', position: 3 },
                ],
                submittedAt: new Date('2024-06-25T09:20:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Bali', userId: 'user14', totalScore: 6, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 1 },
            { id: '2', title: 'Paris', userId: 'user15', totalScore: 6, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 1 },
            { id: '3', title: 'Tokyo', userId: 'user16', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '4', title: 'New York', userId: 'user17', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
    {
        id: '6',
        title: 'Favorite Video Game Genres',
        featured: false,
        lastVoted: new Date('2024-07-05T14:20:00Z'),
        votes: ['community_a', 'community_b'],
        submissions: [
            {
                id: 'sub_6_a',
                userId: 'community_a',
                rankingId: '6',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-07-05T14:21:00Z'),
            },
            {
                id: 'sub_6_b',
                userId: 'community_b',
                rankingId: '6',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-07-05T14:23:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'RPG', userId: 'user18', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'FPS', userId: 'user19', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '3', title: 'Strategy', userId: 'user20', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '4', title: 'Puzzle', userId: 'user21', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
    {
        id: '7',
        title: 'Best Coffee Types',
        featured: false,
        lastVoted: new Date('2024-06-18T08:30:00Z'),
        votes: ['community_a', 'community_b'],
        submissions: [
            {
                id: 'sub_7_a',
                userId: 'community_a',
                rankingId: '7',
                rankedOptions: [
                    { optionId: '3', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-06-18T08:31:00Z'),
            },
            {
                id: 'sub_7_b',
                userId: 'community_b',
                rankingId: '7',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '3', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-06-18T08:33:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Espresso', userId: 'user22', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'Cappuccino', userId: 'user23', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '3', title: 'Latte', userId: 'user24', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '4', title: 'Americano', userId: 'user25', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
    {
        id: '8',
        title: 'Top Streaming Services',
        featured: false,
        lastVoted: new Date('2024-07-03T16:00:00Z'),
        votes: ['community_a', 'community_b', 'community_c'],
        submissions: [
            {
                id: 'sub_8_a',
                userId: 'community_a',
                rankingId: '8',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-07-03T16:01:00Z'),
            },
            {
                id: 'sub_8_b',
                userId: 'community_b',
                rankingId: '8',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '4', position: 2 },
                    { optionId: '1', position: 3 },
                ],
                submittedAt: new Date('2024-07-03T16:03:00Z'),
            },
            {
                id: 'sub_8_c',
                userId: 'community_c',
                rankingId: '8',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '4', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-07-03T16:05:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Netflix', userId: 'user26', totalScore: 7, submissionCount: 3, firstPlaceCount: 2, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '2', title: 'Disney+', userId: 'user27', totalScore: 6, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 1 },
            { id: '3', title: 'HBO Max', userId: 'user28', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '4', title: 'Amazon Prime', userId: 'user29', totalScore: 4, submissionCount: 2, firstPlaceCount: 0, secondPlaceCount: 2, thirdPlaceCount: 0 },
        ],
        suggestions: []
    },
    {
        id: '9',
        title: 'Best Workout Activities',
        featured: false,
        lastVoted: new Date('2024-06-22T07:00:00Z'),
        votes: ['community_a', 'community_b'],
        submissions: [
            {
                id: 'sub_9_a',
                userId: 'community_a',
                rankingId: '9',
                rankedOptions: [
                    { optionId: '3', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-06-22T07:01:00Z'),
            },
            {
                id: 'sub_9_b',
                userId: 'community_b',
                rankingId: '9',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '4', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-06-22T07:03:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Running', userId: 'user30', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'Weight Training', userId: 'user31', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '3', title: 'Yoga', userId: 'user32', totalScore: 4, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '4', title: 'Swimming', userId: 'user33', totalScore: 2, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 1, thirdPlaceCount: 0 },
        ],
        suggestions: []
    },
    {
        id: '10',
        title: 'Favorite Music Genres',
        featured: false,
        lastVoted: new Date('2024-07-08T20:30:00Z'),
        votes: ['community_a', 'community_b'],
        submissions: [
            {
                id: 'sub_10_a',
                userId: 'community_a',
                rankingId: '10',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-07-08T20:31:00Z'),
            },
            {
                id: 'sub_10_b',
                userId: 'community_b',
                rankingId: '10',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '4', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-07-08T20:33:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Rock', userId: 'user34', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'Hip Hop', userId: 'user35', totalScore: 4, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '3', title: 'Jazz', userId: 'user36', totalScore: 0, submissionCount: 0, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 0 },
            { id: '4', title: 'Electronic', userId: 'user37', totalScore: 3, submissionCount: 2, firstPlaceCount: 0, secondPlaceCount: 1, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
    {
        id: '11',
        title: 'Top Social Media Platforms',
        featured: false,
        lastVoted: new Date('2024-06-28T13:45:00Z'),
        votes: ['community_a', 'community_b'],
        submissions: [
            {
                id: 'sub_11_a',
                userId: 'community_a',
                rankingId: '11',
                rankedOptions: [
                    { optionId: '3', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '2', position: 3 },
                ],
                submittedAt: new Date('2024-06-28T13:46:00Z'),
            },
            {
                id: 'sub_11_b',
                userId: 'community_b',
                rankingId: '11',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '3', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-06-28T13:48:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Instagram', userId: 'user38', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'Twitter/X', userId: 'user39', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '3', title: 'TikTok', userId: 'user40', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '4', title: 'LinkedIn', userId: 'user41', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
    {
        id: '12',
        title: 'Best Breakfast Foods',
        featured: false,
        lastVoted: new Date('2024-06-12T06:30:00Z'),
        votes: ['community_a', 'community_b'],
        submissions: [
            {
                id: 'sub_12_a',
                userId: 'community_a',
                rankingId: '12',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-06-12T06:31:00Z'),
            },
            {
                id: 'sub_12_b',
                userId: 'community_b',
                rankingId: '12',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-06-12T06:33:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Pancakes', userId: 'user42', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '2', title: 'Eggs & Bacon', userId: 'user43', totalScore: 5, submissionCount: 2, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '3', title: 'Cereal', userId: 'user44', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '4', title: 'Avocado Toast', userId: 'user45', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
    {
        id: '13',
        title: 'Top Car Brands',
        featured: false,
        lastVoted: new Date('2024-07-06T11:00:00Z'),
        votes: ['community_a', 'community_b', 'community_c'],
        submissions: [
            {
                id: 'sub_13_a',
                userId: 'community_a',
                rankingId: '13',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '1', position: 2 },
                    { optionId: '4', position: 3 },
                ],
                submittedAt: new Date('2024-07-06T11:01:00Z'),
            },
            {
                id: 'sub_13_b',
                userId: 'community_b',
                rankingId: '13',
                rankedOptions: [
                    { optionId: '1', position: 1 },
                    { optionId: '2', position: 2 },
                    { optionId: '3', position: 3 },
                ],
                submittedAt: new Date('2024-07-06T11:03:00Z'),
            },
            {
                id: 'sub_13_c',
                userId: 'community_c',
                rankingId: '13',
                rankedOptions: [
                    { optionId: '2', position: 1 },
                    { optionId: '4', position: 2 },
                    { optionId: '1', position: 3 },
                ],
                submittedAt: new Date('2024-07-06T11:05:00Z'),
            },
        ],
        options: [
            { id: '1', title: 'Toyota', userId: 'user46', totalScore: 6, submissionCount: 3, firstPlaceCount: 1, secondPlaceCount: 1, thirdPlaceCount: 1 },
            { id: '2', title: 'Tesla', userId: 'user47', totalScore: 8, submissionCount: 3, firstPlaceCount: 2, secondPlaceCount: 1, thirdPlaceCount: 0 },
            { id: '3', title: 'BMW', userId: 'user48', totalScore: 1, submissionCount: 1, firstPlaceCount: 0, secondPlaceCount: 0, thirdPlaceCount: 1 },
            { id: '4', title: 'Honda', userId: 'user49', totalScore: 3, submissionCount: 2, firstPlaceCount: 0, secondPlaceCount: 1, thirdPlaceCount: 1 },
        ],
        suggestions: []
    },
];