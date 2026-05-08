import { Page } from '@playwright/test';
import { Selectors } from '../core/selectors';

export class SearchBar {
  constructor(private page: Page) {}

  async search(query: string): Promise<void> {
    await this.page.fill(Selectors.home.searchInput, query);
    await this.page.click(Selectors.home.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clearAndSearch(query: string): Promise<void> {
    await this.page.fill(Selectors.home.searchInput, '');
    await this.search(query);
  }

  async getInputValue(): Promise<string> {
    return this.page.inputValue(Selectors.home.searchInput);
  }
}
