import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  Element,
  Watch
} from '@stencil/core';
import { Selection, select } from 'd3-selection';
import { pie, arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import { quantize } from 'd3-interpolate';
import { interpolateGnBu } from 'd3-scale-chromatic';

@Component({
  tag: 'pie-chart',
  styleUrl: 'pie-chart.css',
  shadow: true,
})
export class PieChart implements ComponentInterface {

  /** The svg component to feed d3 */
  svg: Selection<SVGElement>;

  /** This components' root element */
  @Element() el: HTMLElement;

  /** The width of the chart */
  @Prop() width: number = 600;

  /** The height of the chart */
  @Prop() height: number = 800;

  /** The data to feed into the d3 pie chart */
  @Prop() data: Array<any> = [];

  /** Redraw pie chart when data prop changes */
  @Watch('data')
  watchHandler(newData: Array<any>) {
    this.buildChart();
  }

  componentDidLoad() {
    this.svg = select<SVGElement>(this.el.shadowRoot.querySelectorAll('svg')[0])
      .attr('viewBox', [-this.width / 2, -this.height / 2, this.width, this.height]);

    this.buildChart();
  }

  /** Build the pie chart, invoked whenever the data prop changes */
  buildChart() {

    const arcs = pie()
      .sort(null)
      .value(d => d.value)
      (this.data);

    const color = scaleOrdinal()
      .domain(this.data.map(d => d.label))
      .range(quantize(t => interpolateGnBu(t * 0.8 + 0.1), this.data.length).reverse());

    const singleArc = arc()
      .innerRadius(0)
      .outerRadius(Math.min(this.width, this.height) / 2 - 1);

    this.svg
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('fill', d => color(d.data.label))
      .attr('d', singleArc);
  }

  render() {
    return (
      <Host>
        <slot name="title" />
        <svg />
        <slot name="button" />
      </Host>
    );
  }
}
