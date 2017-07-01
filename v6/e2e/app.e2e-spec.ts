import { V6Page } from './app.po';

describe('v6 App', () => {
  let page: V6Page;

  beforeEach(() => {
    page = new V6Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
