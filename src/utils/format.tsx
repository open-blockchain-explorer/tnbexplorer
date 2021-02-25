export const formatNumber = (n: number) => Intl.NumberFormat().format(n | 0); // eslint-disable-line no-bitwise
