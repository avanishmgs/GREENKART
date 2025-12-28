import { test } from "@playwright/test";
import { PageManager } from "../util/PageManager";
import dataConfig from "../config/dataConfig";
import commonReusables from "../util/commonReusables";
import greenKartHomePage from "../pages/greenKartHomePage";
import loginSetup from "../helpers/LoginSetup";


const testcaseID = "GREENKART_TC_01";
const testData = dataConfig.getTestDataFromCsv(
    dataConfig.greenkartData,
    testcaseID
);

test.describe('@greenkart Green Kart Validation', () => {
    test('@smoke @regression Green Kart Order Flow', async ({ page, context }) => {
        const pages = new PageManager(page);
        const parentPage = page;
        await page.goto(loginSetup.Url);
        await test.step("Click to the Top Deals Link", async () => {
            const newTab = await pages.greenKartHomePage.openTopDealsInNewTab(context);
            pages.logger.info("Clicked Successfully");
            await newTab.waitForLoadState('domcontentloaded');
            await newTab.waitForSelector("table.table tbody tr");
            await pages.greenKartHomePage.validateFruitTableData(newTab);
            await parentPage.bringToFront();
            pages.logger.info("Back To Parent Window");
            await pages.greenKartHomePage.enterValueInSearchTextArea(testData.greenKartProductName);
            await pages.greenKartHomePage.clickOnAddToKartButton();
            pages.logger.info("Clicked on the AddToKart Successfully");
            await pages.greenKartHomePage.clickOnKartSection();
            await pages.greenKartHomePage.clickOnProceedCheckoutOption();
            pages.logger.info("Clicked on Proceed Checkout Option");
            await pages.greenKartHomePage.clickOnPlaceOrderButton();
            await pages.greenKartHomePage.selectCountryFromDropdown(testData.countryName);
            await pages.greenKartHomePage.checkAgreeBox();
            await pages.greenKartHomePage.clickOnProceedButton();
            pages.logger.info("Order Placed Sucessfully on the greenKart.");
        });
    });
});