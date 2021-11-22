import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {SearchParams} from 'utils/search';

export const useQueryParams = () => {
  const {search} = useLocation();

  const mappedQuery = useMemo(() => new SearchParams(search), [search]);
  return mappedQuery;
};
