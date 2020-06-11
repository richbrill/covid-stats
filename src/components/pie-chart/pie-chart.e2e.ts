import { newE2EPage } from '@stencil/core/testing';

describe('pie-chart', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pie-chart></pie-chart>');

    const element = await page.find('pie-chart');
    expect(element).toHaveClass('hydrated');
  });
});
