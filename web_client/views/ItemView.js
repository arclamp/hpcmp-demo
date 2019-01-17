import ItemView from 'girder/views/body/ItemView';
import { wrap } from 'girder/utilities/PluginUtils';

import HPCMPWidget from './HPCMPWidget';

wrap(ItemView, 'render', function (render) {
  this.model.getAccessLevel(accessLevel => {
    render.call(this);

    this.hpcmpWidget = new HPCMPWidget({
      className: 'g-hpcmp-container',
      item: this.model,
      accessLevel: accessLevel,
      parentView: this
    });
    this.hpcmpWidget.$el.appendTo(this.$el);
  });

  return this;
});
