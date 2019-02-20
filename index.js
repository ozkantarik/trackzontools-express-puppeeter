const express = require('express');

const puppeeter =  require('puppeteer');
 
const app = express();
 
app.get('/get-html', async (req, res) => {

    const browser  = await puppeeter.launch({
        headless:false,
    });
   const page =  await browser.newPage();

    await page.goto(req.query.url);
    await res.send({
        'html' : await   page.evaluate(() => document.body.innerHTML) 
    });

    await browser.close();
});
 
app.listen(3333, () => {
  console.log('Listening on port 3333');
});