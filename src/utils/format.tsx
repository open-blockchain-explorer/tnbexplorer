export const formatNumber = (n: number) => Intl.NumberFormat().format(n | 0);
