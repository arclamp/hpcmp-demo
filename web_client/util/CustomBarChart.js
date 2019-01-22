import { BarChart } from '@candela/vega';

export default class CustomLineChart extends BarChart {
  constructor (el, options) {
    super(el, options);
  }

  generateSpec () {
    let spec = super.generateSpec();

    if (this.options.yAxis) {
      spec.encoding.y.axis = this.options.yAxis;
    }

    return spec;
  }
}
