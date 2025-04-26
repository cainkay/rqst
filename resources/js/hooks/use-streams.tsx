import { Stream } from '@/types/stream';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseStreamsParams {
  initialData: StreamResponse;
}

interface StreamResponse {
  data: Stream[];
  last_page: number;
  total: number;
  current_page: number;
  per_page: number;
}

export const useStreams = ({
  initialData,
}: UseStreamsParams) => {
  // Fetch streams with pagination
  const fetchStreams = async ({ pageParam = 1 }) => {
    const response = await axios.get<StreamResponse>('/stream', {
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
    queryKey: ['streams'],
    queryFn: fetchStreams,
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1]
    },
    getNextPageParam: (lastPage, allPages) => {
      // If we've reached the last page, return undefined to signal that there's no more data
      if (lastPage.last_page <= allPages.length) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  // Extract all streams from all pages
  const allStreams = data?.pages.flatMap(page => page.data) || [];

  return {
    streams: allStreams,
    totalItems: data?.pages[0]?.total || 0,
    isLoading,
    isError,
    hasMorePages: hasNextPage,
    loadMore: fetchNextPage,
    isLoadingMore: isFetchingNextPage,
    refetch
  };
};