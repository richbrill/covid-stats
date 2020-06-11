import { newSpecPage } from '@stencil/core/testing';
import { PieChart } from './pie-chart';

describe('pie-chart', () => {
  it('renders with default title and button text', async () => {
    const page = await newSpecPage({
      components: [PieChart],
      html: `<pie-chart></pie-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <pie-chart>
        <mock:shadow-root>
          <h1>Title</h1>
          <button>Reset</button>
        </mock:shadow-root>
      </pie-chart>
    `);
  });

  it('renders prop values', async () => {
    const {root} = await newSpecPage({
      components: [PieChart],
      html: `<pie-chart title-text="England" button-text="Clear selected country"></pie-chart>`
    });
    expect(root).toEqualHtml(`
      <pie-chart title-text="England" button-text="Clear selected country">
        <mock:shadow-root>
          <h1>England</h1>
          <button>Clear selected country</button>
        </mock:shadow-root>
      </pie-chart>
    `);
  });
});
