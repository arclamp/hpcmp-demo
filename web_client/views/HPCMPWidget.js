import { LineChart } from '@candela/vega';

import View from 'girder/views/View';

import HPCMPWidgetTemplate from './hpcmpWidget.pug';


const HPCMPWidget = View.extend({
  initialize: function (settings) {
    this.item = settings.item;
    this.accessLevel = settings.accessLevel;

    this.render();
  },

  render: function () {
    this.$el.html(HPCMPWidgetTemplate());

    const el = this.$('.volume-chart').get(0);

    this.volumeChart = new LineChart(el, {
      data: [
        {a: 1.0, b: 1},
        {a: 1.1, b: 4},
        {a: 1.2, b: 9},
        {a: 1.3, b: 16},
        {a: 1.4, b: 25},
      ],
      x: 'a',
      y: 'b',
      width: 500,
      height: 400,
      renderer: 'svg'
    });
    this.volumeChart.render();

    return this;
  },

  addData: function (x, y) {
    this.volumeChart.options.data.push({a: x, b: y});
    this.volumeChart.options.data = this.volumeChart.options.data.slice(1);
    this.volumeChart.render();
  }
});

export default HPCMPWidget;
