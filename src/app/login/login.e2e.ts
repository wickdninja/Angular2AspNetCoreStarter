describe('App', () => {

  beforeEach(() => {
    browser.get('/login');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Login';
    expect(subject).toEqual(result);
  });
});
