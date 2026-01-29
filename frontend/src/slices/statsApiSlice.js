import { apiSlice } from './apiSlice';
const STATS_URL = '/api/stats';

export const statsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query({
            query: () => ({
                url: STATS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetStatsQuery } = statsApiSlice;
