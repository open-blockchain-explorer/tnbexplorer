import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {QueryParams} from 'utils/search';

export const useQueryParams = () => {
  const {search} = useLocation();

  const mappedQuery = useMemo(() => QueryParams.fromSearchString(search), [search]);
  return mappedQuery;
};
