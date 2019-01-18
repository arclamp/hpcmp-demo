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
        console.log(post);

        const getData = () => {
          restRequest({
            type: 'POST',
            url: `hpcmp/stream/${this.model.id}/read`,
          }).then((data) => {
            console.log(data);
            let rec = {
              a: +data.data[0].ts,
              b: +data.data[0].resp_bytes || 0
            };
            console.log(rec);
            this.hpcmpWidget.addData(rec.a, rec.b);

            window.setTimeout(getData, 1000);
          });
        }

        getData();
      });

      // let counter = 1.5;
      // let value = 0;
      // window.setInterval(() => {
        // this.hpcmpWidget.addData(counter, 15 + value);
        // counter += 0.1;
        // value = (value + 1) % 5;
      // }, 1000);
    }
  });

  return this;
});
