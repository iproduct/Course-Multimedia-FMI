import { AngularHelloPage } from './app.po';

describe('angular-hello App', () => {
  let page: AngularHelloPage;

  beforeEach(() => {
    page = new AngularHelloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
