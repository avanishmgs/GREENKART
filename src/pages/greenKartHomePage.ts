import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import loginSetup from "../helpers/LoginSetup";
import commonReusables from "../util/commonReusables";

class greenKartHomePage {

    private readonly topDeals_LOC: Locator;
    private readonly searchFruitsAndVegetables_LOC: Locator;
    private readonly searchButton_LOC: Locator;
    private readonly addToKartButton_LOC: Locator;
    private readonly kart_LOC: Locator;
    private readonly proceedCheckoutButton_LOC: Locator;
    private readonly placeOrder_LOC: Locator;
    private readonly countryDropdown_LOC: Locator;
    private readonly agreeCheckbox_LOC: Locator;
    private readonly proceedButton_LOC: Locator;
    private readonly placedOrderSuccess_LOC: Locator;


    constructor(private page: Page) {
        this.topDeals_LOC = page.getByRole('link', { name: 'Top Deals' });
        this.searchFruitsAndVegetables_LOC = page.locator("//input[@placeholder='Search for Vegetables and Fruits']");
        this.searchButton_LOC = page.locator("button.search-button");
        this.addToKartButton_LOC = page.locator("//button[normalize-space()='ADD TO CART']");
        this.kart_LOC = page.locator("//img[@alt='Cart']");
        this.proceedCheckoutButton_LOC = page.locator("//button[normalize-space()='PROCEED TO CHECKOUT']");
        this.placeOrder_LOC = page.locator("//button[normalize-space()='Place Order']");
        this.countryDropdown_LOC = page.locator("select[style='width: 200px;']");
        this.agreeCheckbox_LOC = page.locator("input.chkAgree");
        this.proceedButton_LOC = page.locator("//button[normalize-space()='Proceed']");
        this.placedOrderSuccess_LOC = page.locator("div.wrapperThree");
    }

    async clickTopDeals() {
        await this.topDeals_LOC.click();
    }

    async clickOnAddToKartButton() {
        await this.addToKartButton_LOC.first().click();
    }

    async clickOnKartSection() {
        await this.kart_LOC.click();
    }

    async clickOnProceedCheckoutOption() {
        await this.proceedCheckoutButton_LOC.click();
    }

    async clickOnPlaceOrderButton() {
        await this.placeOrder_LOC.click();
    }

    async selectCountryFromDropdown(value: string | number): Promise<void> {
        await this.countryDropdown_LOC.waitFor({ state: "visible" });
        await this.countryDropdown_LOC.selectOption({ value: String(value) });
    }

    async checkAgreeBox(): Promise<void> {
        await this.agreeCheckbox_LOC.waitFor({ state: "visible" });
        await this.agreeCheckbox_LOC.check();
    }

    async clickOnProceedButton() {
        await this.proceedButton_LOC.click();
    }

    async clickOnSearchButton() {
        await this.searchButton_LOC.click();
    }

    async openTopDealsInNewTab(context: BrowserContext) {
        return await commonReusables.switchToNewTab(context, async () => {
            await this.topDeals_LOC.click();
        });
    }

    async validateFruitTableData(page: Page) {

        const fruits = await page.locator("table.table tbody tr td:nth-child(1)").allTextContents();
        const prices = await page.locator("table.table tbody tr td:nth-child(2)").allTextContents();
        const discounts = await page.locator("table.table tbody tr td:nth-child(3)").allTextContents();
        for (let i = 0; i < fruits.length; i++) {
            const fruit = fruits[i].trim();
            const price = prices[i].trim();
            const discount = discounts[i].trim();
            expect(fruit).not.toBe("");
            expect(!isNaN(Number(price))).toBeTruthy();
            expect(!isNaN(Number(discount))).toBeTruthy();
        }
        console.log("Validated GreenKart TopDeals Content.");
    }

    async enterValueInSearchTextArea(value: string | number): Promise<void> {
        await this.searchFruitsAndVegetables_LOC.waitFor({ state: "visible" });
        await this.searchFruitsAndVegetables_LOC.fill(String(value));
    }

    async validateOrderSuccessMessage() {
        await expect(this.placedOrderSuccess_LOC).toBeVisible();
        await expect(this.placedOrderSuccess_LOC.innerText()).resolves.toContain("Thank you.");
        await expect(this.placedOrderSuccess_LOC.innerText()).resolves.toContain("Redirecting back to cart");
    }
}

export default greenKartHomePage;
