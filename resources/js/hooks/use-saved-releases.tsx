import { Nugget } from '@/types/stream';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { DateRange } from 'react-day-picker';

interface UseReleasesParams {
    initialData: ReleaseResponse;
    categories: number[];
    lgas: string[];
    states: string[];
    search: string;
    date?: DateRange;
    trigger?: Date;
}

interface ReleaseResponse {
    data: Nugget[];
    last_page: number;
    total: number;
    current_page: number;
    per_page: number;
}

export const useSavedReleases = ({ initialData, categories, lgas, states, search, date, trigger }: UseReleasesParams) => {
    // Fetch releases with pagination
    const fetchReleases = async ({ pageParam = 1 }) => {
        const response = await axios.get<ReleaseResponse>('/releases/saved', {
            params: {
                page: pageParam,
                categories: categories.length > 0 ? categories.join(',') : undefined,
                lgas: lgas.length > 0 ? lgas.join(',') : undefined,
                states: states.length > 0 ? states.join(',') : undefined,
                search: search.length > 0 ? search : undefined,
                start_date: date?.from ? dayjs(date.from).format('YYYY-MM-DD') : undefined,
                end_date: date?.to ? dayjs(date.to).format('YYYY-MM-DD') : undefined,
            },
        });
        return response.data;
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useInfiniteQuery({
        queryKey: ['releases-saved', trigger],
        queryFn: fetchReleases,
        initialPageParam: 1,
        initialData: {
            pages: [initialData],
            pageParams: [1],
        },
        getNextPageParam: (lastPage, allPages) => {
            // If we've reached the last page, return undefined to signal that there's no more data
            if (lastPage?.last_page <= allPages.length) {
                return undefined;
            }
            return allPages.length + 1;
        },
    });

    const allNuggets = data?.pages.flatMap((page) => page?.data) || [];

    return {
        nuggets: allNuggets,
        totalItems: data?.pages[0]?.total || 0,
        isLoading,
        isError,
        hasMorePages: hasNextPage,
        loadMore: fetchNextPage,
        isLoadingMore: isFetchingNextPage,
        refetch,
    };
};
