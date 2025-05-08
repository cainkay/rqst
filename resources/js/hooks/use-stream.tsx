import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DateRange } from 'react-day-picker';
import { StreamGrouped as StreamType } from '@/types/stream';
import { User } from '@/types';

interface UseStreamsParams {
  initialStream: StreamType;
  selectedStates?: string[];
  selectedLGAs?: string[];
  selectedCategories?: number[];
  dateRange?: DateRange;
  user?: User
}

interface StreamResponse {
  stream: StreamType;
}

export const useStream = ({
  initialStream,
  user
}: UseStreamsParams) => {
  // Fetch streams with pagination
  const fetchStreams = async ({ pageParam = 1 }) => {
    const response = await axios.get<StreamResponse>('/', {
      params: {
        page: pageParam,
      }
    });
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch
  } = useInfiniteQuery({
    queryKey: ['stream', user],
    queryFn: fetchStreams,
    initialPageParam: 1,
    initialData: {
      pages: [{ stream: initialStream }],
      pageParams: [1]
    },
    getNextPageParam: (lastPage, allPages) => {
      // If we've reached the last page, return undefined to signal that there's no more data
      if (lastPage.stream.last_page <= allPages.length) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
    console.log("🚀 ~ user:", user)

  // Extract all streams from all pages
  const allStreams = data?.pages.flatMap(page => [page.stream]) || [];

  return {
    streams: allStreams,
    isLoading,
    isError,
    hasMorePages: hasNextPage,
    loadMore: fetchNextPage,
    isLoadingMore: isFetchingNextPage,
    refetch
  };
};