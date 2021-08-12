import {format as formatDate} from 'date-fns';

export const config = {
  appendPadding: [20, 0, 0, 0],
  data: null, // override and supply data
  height: 400,
  meta: {
    date: {
      formatter: function formatter(date: string) {
        return formatDate(new Date(date), 'MMM dd, yyyy');
      },
      nice: true,
      tickCount: 10,
    },
  },
  slider: {
    start: 0,
    end: 1,
  },
  smooth: false,

  xAxis: {
    title: {
      offset: 40,
      text: 'Date',
      visible: true,
    },
    type: 'time', // override and supply x field property
  },
  xField: 'date', // override and supply y field property
};
