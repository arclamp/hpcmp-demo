import ItemView from 'girder/views/body/ItemView';
import { wrap } from 'girder/utilities/PluginUtils';
import { restRequest } from 'girder/rest';

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

      restRequest({
        type: 'POST',
        url: `hpcmp/stream/${this.model.id}`,
        data: {
          header: true
        }
      }).then((post) => {
        this.hpcmpWidget.start();
      });
    }
  });

  return this;
});
