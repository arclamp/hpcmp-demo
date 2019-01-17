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

    return this;
  }
});

export default HPCMPWidget;
