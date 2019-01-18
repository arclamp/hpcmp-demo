import { LineChart } from '@candela/vega';

import View from 'girder/views/View';

import HPCMPWidgetTemplate from './hpcmpWidget.pug';

const HPCMPWidget = View.extend({
  events: {
    'click button.start': function (event) {
      this.running = true;
    },
    'click button.stop': function (event) {
      this.running = false;
    },
  },

  initialize: function (settings) {
    this.item = settings.item;
    this.accessLevel = settings.accessLevel;

    this.render();
  },

  render: function () {
    this.$el.html(HPCMPWidgetTemplate());

    const el = this.$('.volume-chart').get(0);

    this.volumeChart = new LineChart(el, {
      data: [],
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
    // this.volumeChart.options.data = this.volumeChart.options.data.slice(1);
    this.volumeChart.render();
  }
});

export default HPCMPWidget;
