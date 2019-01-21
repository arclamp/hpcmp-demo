import { LineChart } from '@candela/vega';

import View from 'girder/views/View';
import { restRequest } from 'girder/rest';

import HPCMPWidgetTemplate from './hpcmpWidget.pug';

const HPCMPWidget = View.extend({
  events: {
    'click button.start': function (event) {
      this.start();
    },
    'click button.stop': function (event) {
      this.stop();
    },
  },

  initialize: function (settings) {
    this.item = settings.item;
    this.accessLevel = settings.accessLevel;
    this.interval = null;

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
      renderer: 'svg',
      xScale: {
        nice: false
      }
    });
    this.volumeChart.render();

    return this;
  },

  start: function () {
    if (!this.interval) {
      this.interval = window.setInterval(() => this.getData(), 500);
    }
  },

  stop: function () {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
  },

  getData: function () {
    restRequest({
      type: 'POST',
      url: `hpcmp/stream/${this.item.id}/read`,
    }).then((data) => {
      let rec = {
        a: +data.data[0].ts,
        b: +data.data[0].resp_bytes || 0
      };
      console.log(JSON.stringify(rec));
      this.addData(rec.a, rec.b);
    });
  },

  addData: function (x, y) {
    this.volumeChart.options.data.push({a: x, b: y});
    this.volumeChart.render();
  }
});

export default HPCMPWidget;
