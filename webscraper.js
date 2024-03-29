const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const SBR_WEBDRIVER = '';

async function main() {
    console.log('Connecting to Scraping Browser...');
    const options = new chrome.Options();
    options.addArguments('--remote-debugging-port=9222');
    options.setChromeBinaryPath(SBR_WEBDRIVER);
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        console.log('Connected! Navigating to https://google.com...');
        await driver.get('https://google.com');
        // CAPTCHA handling: If you're expecting a CAPTCHA on the target page, use the following code snippet to check the status of Scraping Browser's automatic CAPTCHA solver
        // console.log('Waiting captcha to solve...');
        // const solveRes = await driver.executeCdpCommand('Captcha.waitForSolve', { detectTimeout: 10000 });
        // console.log('Captcha solve status:', solveRes.value.status);
        console.log('Navigated! Scraping page content...');
        const html = await driver.getPageSource();
        console.log(html);
    } finally {
        await driver.quit();
    }
}

main();
