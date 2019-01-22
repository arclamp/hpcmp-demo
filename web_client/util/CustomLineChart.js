import { LineChart } from '@candela/vega';

export default class CustomLineChart extends LineChart {
  constructor (el, options) {
    super(el, options);
  }

  generateSpec () {
    let spec = super.generateSpec();

    if (this.options.xAxis) {
      spec.encoding.x.axis = this.options.xAxis;
    }

    return spec;
  }
}
