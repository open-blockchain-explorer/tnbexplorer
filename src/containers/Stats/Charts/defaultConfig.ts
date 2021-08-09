export const config = {
  appendPadding: [20, 0, 0, 0],
  data: null, //overrifd and supply data
  height: 400,
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
    type: 'time', //override and supply x field property
  },
  xField: 'date', //override and supply y field property
};
