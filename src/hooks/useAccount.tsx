import {useParams} from 'react-router-dom';

interface AccountParam {
  accountNumber: string;
}

export const useAccount = () => {
  const param = useParams<AccountParam>();

  return param.accountNumber;
};
