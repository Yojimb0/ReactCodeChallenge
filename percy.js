const PercyScript = require('@percy/script');
const httpServer = require('http-server');

const PORT = process.env.PORT_NUMBER || 3000;
const TEST_URL = `http://localhost:${PORT}`;

// A script to navigate our app and take snapshots with Percy.
PercyScript.run(async (page, percySnapshot) => {
  let server = httpServer.createServer();
  server.listen(PORT);

  console.log(`Server started at ${TEST_URL}`);

  await page.goto(TEST_URL);
  await percySnapshot('Main page');

  // Enter a new to-do.
  await page.click('main article:nth-child(1) button');
  await page.click('main article:nth-child(2) button');
  await page.click('main article:nth-child(4) button');
  await page.click('main article:nth-child(5) button');
  await page.click('main article:nth-child(1) button');
  await percySnapshot('Main page with 5 clicks', { widths: [768, 992, 1200] });
  server.close();
});