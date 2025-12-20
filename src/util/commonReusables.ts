import * as fs from "fs";
import { Locator, Page, expect } from "@playwright/test";
import { BrowserContext } from "@playwright/test";


/***
 * @class CommonReusables
 * @description A class that provides common utility functions.
 */

class CommonReusables {
  
  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    // Add the last field
    result.push(current);

    return result;
  }

  public readTestDataFromCsv(
    filePath: string,
    testScriptId: string
  ): Record<string, string> {
    const data: Record<string, string>[] = [];
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const lines = csvContent.split(/\r?\n/);
    if (lines.length === 0) {
      throw new Error(`CSV file is empty: ${filePath}`);
    }
    const headers = this.parseCsvLine(lines[0]);
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line) {
        const values = this.parseCsvLine(line);
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });

        data.push(row);
      }
    }
    const targetRow = data.find(row => row["Test Script ID"] === testScriptId);
    if (!targetRow) {
      throw new Error(`Test Script ID "${testScriptId}" not found in CSV file: ${filePath}`);
    }
    return targetRow;
  }

  async switchToNewTab(context: BrowserContext, action: () => Promise<void>): Promise<Page> {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      action()  
    ]);

    await newTab.waitForLoadState();
    return newTab;
  }

}
const commonReusables = new CommonReusables();
export default commonReusables;