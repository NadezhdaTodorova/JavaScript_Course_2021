const { generateText, checkAndgenerate } = require('./util');
const puppeteer = require('puppeteer');

test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});


test('should generate a valid text output', () => {
    const text = checkAndgenerate('Max', 29);
    expect(text).toBe('Max (29 years old)');
})

test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto(
        'N:/JavaScript/Testing/testing-01-starting-setup/index.html'
    );
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
});