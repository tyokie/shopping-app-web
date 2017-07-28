import { FrontendPage } from './app.po';

describe('frontend App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should display starting total product count of zero', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain(
      `Total`);
    expect(page.getParagraphText()).toContain(
      `Products`);
    expect(page.getParagraphText()).toContain(
      `0`);
  });
});
