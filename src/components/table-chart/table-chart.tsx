import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  Element,
  Watch,
  State,
  Event,
  EventEmitter
} from '@stencil/core';
import { Selection, select } from 'd3-selection';

@Component({
  tag: 'table-chart',
  styleUrl: 'table-chart.css',
  shadow: true,
})
export class TableChart implements ComponentInterface {

  /** The table element to feed d3 */
  table: Selection<HTMLElement>;

  /** Set a deafult number of rows to show when show more is false */
  maxRows: number = 7;

  /** This components' root element */
  @Element() el: HTMLElement;
  
  /** The width of the chart */
  @Prop() width: number = 600;

  /** The height of the chart */
  @Prop() height: number = 800;

  @Prop() selectedRow: any;
  @Watch('selectedRow')
  watchSelectedRowHandler(newData: Array<any>) {
    this.renderChart();
  }
  
  /** The data to feed into the d3 table */
  @Prop() data: Array<object>;

  /** Redraw table chart when data prop changes */
  @Watch('data')
  watchHandler(newData: Array<any>) {
    this.renderChart();
  }

  @Prop() columnHeaders: Array<string>;
  
  @State() tableData: Array<object>;

  /** Decide whether to expand or collapse the table to only a few rows */
  @State() showingMore: boolean = false;
 
  @Watch('showingMore')
  watchShowingMore() {
    this.renderChart();
  }

  handleBtnClick() {
    this.showingMore = !this.showingMore;
  }

  @State() clickedRow: Array<any> = null;
  @Event() rowClicked: EventEmitter;
  handleRowClick(rowData) {
    this.rowClicked.emit(rowData);
    this.clickedRow = rowData;
  }

  componentDidLoad() {
    this.table = select<HTMLElement>(this.el.shadowRoot.querySelectorAll('table')[0]);

    this.table
      .append('thead')
      .selectAll('th')
      .data(this.columnHeaders)
      .join('th')
      .text(d => d)
    
    this.table.append('tbody');
  }
 
  /** Render the table chart, invoked whenever the data prop or showingMore state changes */
  renderChart() {
    const data = this.showingMore ? this.data : this.data.slice(0, this.maxRows);

    this.table
      .select('tbody')
      .selectAll('tr')
      .data(data)
      .join('tr')
      .on('click', d => this.handleRowClick(d))
      .attr('class', d => d[0] === (this.selectedRow && this.selectedRow.label) ? 'selected' : '')
      .selectAll('td')
      .data(d => d)
      .join('td')
      .text(d => d)
  }

  render() {
    return (
      <Host>
        <div class="justify-end">
          <a onClick={() => this.handleBtnClick()}>Show {this.showingMore ? 'less' : 'more'}...</a>
        </div>
        <table />
      </Host>
    );
  }

}
