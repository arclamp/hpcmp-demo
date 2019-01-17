import ItemView from 'girder/views/body/ItemView';
import { wrap } from 'girder/utilities/PluginUtils';

import HPCMPWidget from './HPCMPWidget';

wrap(ItemView, 'render', function (render) {
  this.model.getAccessLevel(accessLevel => {
    render.call(this);

    const go = (this.model.get('meta') || {}).hpcmp;

    if (go) {
      this.hpcmpWidget = new HPCMPWidget({
        className: 'g-hpcmp-container',
        item: this.model,
        accessLevel: accessLevel,
        parentView: this
      });
      this.hpcmpWidget.$el.appendTo(this.$el);

      let counter = 1.5;
      let value = 0;
      window.setInterval(() => {
        this.hpcmpWidget.addData(counter, 15 + value);
        counter += 0.1;
        value = (value + 1) % 5;
      }, 1000);
    }
  });

  return this;
});
