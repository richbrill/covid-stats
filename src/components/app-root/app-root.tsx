import {
  Component,
  Prop,
  h,
  Element,
  Watch,
  Host,
  Listen,
  State
} from '@stencil/core';
import '@stencil/redux';
import { Store, Action, Unsubscribe } from '@stencil/redux';
import { fetchData, changeSelectedRow, emptySelectedRow } from '../../store/actions';
import { store } from '../../store/store';
import { selectedRowSelector, tableDataSelector, globalRowSelector } from '../../store/selectors';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @Element() el: HTMLElement;
  @Prop({ context: 'store' }) store: Store;
  @Prop({ mutable: true }) selectedRow: any;
  @Prop({ mutable: true }) globalRow: any;
  @Prop({ mutable: true }) tableData: any;

  fetchData: Action;
  changeSelectedRow: Action;
  emptySelectedRow: Action;
  unsubscribe!: Unsubscribe;
  
  componentWillLoad() {
    this.store.setStore(store);

    // Use reselect to memoize slices of state (and format them too)
    this.unsubscribe = this.store.mapStateToProps(this, state => ({
      selectedRow: selectedRowSelector(state),
      globalRow: globalRowSelector(state),
      tableData: tableDataSelector(state)
    }));

    this.store.mapDispatchToProps(this, {
      fetchData,
      changeSelectedRow,
      emptySelectedRow
    });

    this.fetchData();
  }
  
  componentDidUnload() {
    this.emptySelectedRow();
  }

  @Listen('rowClicked')
  handleRowClick(e: CustomEvent) {
    const row = e.detail;
    this.changeSelectedRow(row);
  }

  unselect() {
    this.emptySelectedRow();
  }

  render() {
    return (
      <Host>
        <div class="app">
          <div class="table">
            <h1>COVID19 Summary</h1>
            <p>Lorem ipsum dolor sit amet, primis dicunt ea pro, partem semper no eos. Sit cu autem imperdiet, eum ea labitur voluptatum comprehensam, at sed brute detracto. Per iusto legere adipiscing eu, impetus recusabo te quo.</p>
            <table-chart
              data={this.tableData}
              columnHeaders={['Country', 'Total Confirmed', 'Total Deaths', 'Total Recovered']}
              selectedRow={this.selectedRow}
            >
            </table-chart>
          </div>
          <pie-chart data={this.selectedRow.data}>
            <h1 slot="title">{this.selectedRow.label}</h1>
            <button slot="button" class="mb-20" onClick={() => this.unselect()}>Clear selected country</button>
          </pie-chart>
        </div>
      </Host>
    );
  }
}
