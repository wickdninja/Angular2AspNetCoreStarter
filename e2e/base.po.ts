import { browser, element, by, ProtractorBrowser } from 'protractor';

const delay = 2000;

export class BasePage {
  _browser:ProtractorBrowser
  constructor(){
    this._browser = browser;
    // uncomment to add a delay between actions making the tests more "watchable"
    // this._browser.driver.manage().timeouts().implicitlyWait(delay);
  }

  navigateTo(path:string) {
    return this._browser.get(path);
  }

  getPageTitle(){
    return this._browser.getTitle();
  }
}
