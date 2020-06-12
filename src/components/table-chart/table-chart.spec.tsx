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
          <table>
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </table>
        </mock:shadow-root>
      </table-chart>
    `);
  });

  it('renders prop values correctly', async () => {
    const page = await newSpecPage({
      components: [TableChart],
      html: `<div></div>`
    });

    let component = page.doc.createElement('table-chart');
    (component as any).data = [
      [
        "Chips",
        150
      ],
      [
        "Burger",
        25
      ]
    ];
    (component as any).columnHeaders = ['Food', 'Amount'];
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <table-chart>
        <mock:shadow-root>
          <table>
            <thead>
              <tr>
                <th>
                  Food
                </th>
                <th>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </mock:shadow-root>
      </table-chart>
    `);
  });
});
