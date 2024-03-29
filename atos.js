const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function main() {
    // Set up Chrome options
    const options = new chrome.Options();
    // Uncomment the line below if you want to run Chrome in headless mode
    // options.headless();

    // Create a WebDriver instance
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Navigate to Google
        await driver.get('https://www.google.com');

        // Wait for the cookie popup to appear
        const cookiePopup = await driver.wait(until.elementLocated(By.className('QS5gu sy4vM')), 5000);

        // Check if the cookie popup is displayed
        if (await cookiePopup.isDisplayed()) {
            // Find and click the accept all button of the cookie popup
            const acceptAllButton = await driver.findElement(By.className('QS5gu sy4vM'));
            await acceptAllButton.click();
        }

        // Wait for the search input field to be clickable
        const searchInput = await driver.wait(until.elementLocated(By.className('gLFyf')), 5000);
        await driver.wait(until.elementIsVisible(searchInput), 5000);

        // Clear any existing text in the input field
        await searchInput.clear();

        // Input text into the input field and press Enter
        await searchInput.sendKeys('Atos', Key.ENTER);

        // Wait for the link to appear
        const link = await driver.wait(until.elementLocated(By.className('LC20lb MBeuO DKV0Md')), 5000);

        // Check if the link is displayed
        if (await link.isDisplayed()) {
            // Click the link
            await link.click();
        } else {
            console.log('Link not found or not visible.');
        }

        // Wait for the cookie popup (if present) on the Atos website
        const cookiePopupAtos = await driver.wait(until.elementLocated(By.className('cp_accept')), 5000);

        // Check if the cookie popup is displayed
        if (await cookiePopupAtos.isDisplayed()) {
            // Find and click the accept all button of the cookie popup
            const acceptAllButton = await driver.findElement(By.className('cp_accept'));
            await acceptAllButton.click();
        }

        // Wait for some time to allow page to load
        await driver.sleep(20000);
    } finally {
        // Quit the WebDriver session
        await driver.quit();
    }
}

main();
