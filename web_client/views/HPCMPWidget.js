import { BarChart } from '@candela/vega';

import View from 'girder/views/View';
import { restRequest } from 'girder/rest';

import HPCMPWidgetTemplate from './hpcmpWidget.pug';
import RollingAverage from '../util/RollingAverage';
import CustomLineChart from '../util/CustomLineChart';

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
    this.average = new RollingAverage(30);

    this.render();
  },

  render: function () {
    this.$el.html(HPCMPWidgetTemplate());

    const el = this.$('.volume-chart').get(0);

    this.volumeChart = new CustomLineChart(el, {
      data: [],
      x: 'a',
      xType: 'temporal',
      xAxis: {
        format: '%H:%M:%S.%L'
      },
      y: 'b',
      width: 500,
      height: 400,
      renderer: 'svg',
      xScale: {
        nice: false
      }
    });
    this.volumeChart.render();

    const barEl = this.$('.bar-chart').get(0);
    this.barChart = new BarChart(barEl, {
      data: [{a: 'internal', b: 0}, {a: 'external', b: 0}],
      x: 'a',
      y: 'b',
      width: 100,
      height: 400,
      renderer: 'svg'
    });
    this.barChart.render();

    return this;
  },

  start: function () {
    if (!this.interval) {
      this.interval = window.setInterval(() => this.getData(), 200);
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
        a: +data.data[0].ts * 1000,
        b: +data.data[0].resp_bytes || 0,
        respIP: data.data[0]['id.resp_h']
      };
      console.log(JSON.stringify(rec));

      if (this.volumeChart.options.data.length == 0 || (rec.a > this.volumeChart.options.data[this.volumeChart.options.data.length - 1].a)) {
        this.average.add(rec.b);
        this.addData(rec.a, this.average.average());

        this.countIP(rec.respIP);
      }
    });
  },

  addData: function (x, y) {
    this.volumeChart.options.data.push({a: x, b: y});
    if (this.volumeChart.options.data.length > 50) {
      this.volumeChart.options.data = this.volumeChart.options.data.slice(1);
    }
    this.volumeChart.render();
  },

  countIP: function (ip) {
    const internal = ip.startsWith('192.168.');
    if (internal) {
      this.barChart.options.data[0].b++;
    } else {
      this.barChart.options.data[1].b++;
    }
    this.barChart.render();
  }
});

export default HPCMPWidget;
