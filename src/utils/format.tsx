export const formatNumber = (num: number, decimals = 2) => {
  const si = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'B'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (Math.abs(num) >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(decimals).replace(rx, '$1').concat(si[i].symbol);
};

export const formatPercent = (num: number, decimals = 2) => {
  return num.toFixed(decimals).concat('%');
};

export const formatQueryParamsToString = (queryParams: {[key: string]: string | number}): string => {
  return Object.keys(queryParams).reduce((acc: string, key) => {
    if (acc === '?') {
      return acc.concat(`${key}=${queryParams[key]}`);
    }
    return acc.concat(`&${key}=${queryParams[key]}`);
  }, '?');
};
