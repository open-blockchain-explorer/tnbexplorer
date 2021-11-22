import {format as formatDate} from 'date-fns';
import {formatNumber} from 'utils/format';

export default {
  data: [],
  meta: {
    date: {
      formatter: function formatter(date: string) {
        return formatDate(new Date(date), 'MMM dd, yyyy');
      },
      nice: true,
      tickCount: 10,
    },
    balance: {
      alias: 'Balance (TNB)',
      formatter: function formatter(balance: number) {
        return formatNumber(balance);
      },
      nice: true,
      tickCount: 11,
    },
  },
  smooth: true,
  slider: {
    start: 0,
    end: 1,
  },

  tooltip: {
    formatter: (datum: any) => {
      return {
        name: 'Coin Balance',
        value: datum.balance.toLocaleString(),
        title: formatDate(new Date(datum.date), 'eeee, MMMM do, yyyy'),
      };
    },
  },
  xAxis: {
    title: {
      offset: 40,
      text: 'Date',
      visible: true,
    },
  },
  xField: 'date',
  yAxis: {
    title: {
      text: 'Coin Balance',
      visible: false,
    },
    type: 'linear',
  },
  yField: 'balance',
};
