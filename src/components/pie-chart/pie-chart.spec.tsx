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
          <slot name="title"></slot>
          <svg viewBox="-300,-400,600,800"></svg>
          <slot name="button"></slot>
        </mock:shadow-root>
      </pie-chart>
    `);
  });

  it('renders data prop and slots', async () => {
    const page = await newSpecPage({
      components: [PieChart],
      html: `<div></div>`
    });

    let component = page.doc.createElement('pie-chart');
    (component as any).data = [
      [
        "Frankfurter",
        100
      ],
      [
        "Mustard",
        5
      ]
    ];
    page.root.appendChild(component);
    await page.waitForChanges();
    
    expect(page.root).toEqualHtml(`
      <pie-chart>
        <mock:shadow-root>
           <slot name="title"></slot>
           <svg viewBox="-300,-400,600,800">
             <path d="M1.830846964725293e-14,-299L0,0Z" fill="rgb(11, 96, 161)"></path>
             <path d="M1.830846964725293e-14,-299L0,0Z" fill="rgb(11, 96, 161)"></path>
          </svg>
          <slot name="button"></slot>
        </mock:shadow-root>
      </pie-chart>
    `);
  });
});
