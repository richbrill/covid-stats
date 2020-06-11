import { newE2EPage } from '@stencil/core/testing';

describe('table-chart', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<table-chart></table-chart>');

    const element = await page.find('table-chart');
    expect(element).toHaveClass('hydrated');
  });
});
