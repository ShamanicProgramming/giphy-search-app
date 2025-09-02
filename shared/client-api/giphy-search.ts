import { RequestHandler } from './request-handler';
import { SearchResult } from '@baseline/types/searchResult';

export const queryGifs = async (
  requestHandler: RequestHandler,
  data: { searchQuery: string },
): Promise<SearchResult> => {
  const response = await requestHandler.request<SearchResult>({
    method: 'GET',
    url: `giphy-search?searchQuery=${data.searchQuery}`,
    hasAuthentication: false,
  });
  if ('data' in response) {
    return response.data;
  }
  throw response;
};