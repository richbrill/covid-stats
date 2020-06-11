import { newSpecPage } from '@stencil/core/testing';
import { TableChart } from './table-chart';

describe('table-chart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TableChart],
      html: `<table-chart></table-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <table-chart>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </table-chart>
    `);
  });

  it('renders prop values correctly', async () => {
    const {root} = await newSpecPage({
      components: [PieChart],
      html: `<table-chart title-text="England" button-text="Clear selected country"></table-chart>`
    });
    expect(root).toEqualHtml(`
      <table-chart>
        <mock:shadow-root>
          <h1>England</h1>
          <button>Clear selected country</button>
        </mock:shadow-root>
      </table-chart>
    `);
  });
});
