
import { Page } from '@playwright/test';
import logger from '../util/loggerUtil';
import commonReusables from '../util/commonReusables';
import dataConfig from '../config/dataConfig';
import greenKartHomePage from '../pages/greenKartHomePage';
 
type PageConstructor<T> = new (page: Page) => T;
 
export class PageManager {
  private _pages = new Map<string, unknown>();
 
  public logger = logger;
  public commonReusables = commonReusables;
  public dataConfig = dataConfig;
 
  constructor(private page: Page) {
  }
  
  private createPage<T>(key: string, PageClass: PageConstructor<T>): T {
    if (!this._pages.has(key)) {
      console.log(`Creating ${PageClass.name}...`);
      const pageInstance = new PageClass(this.page);
      this._pages.set(key, pageInstance);
      return pageInstance;
    }
    return this._pages.get(key) as T;
  }
 
  get greenKartHomePage(): greenKartHomePage {
    return this.createPage('greenKartHomePage', greenKartHomePage);
  }
 
}