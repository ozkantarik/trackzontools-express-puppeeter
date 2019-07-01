const express = require('express');

const puppeeter =  require('puppeteer');
const UA =  require('./UA');
const TOR = require('./TOR.js');
const app = express();

var UACounter = 0;


app.get('/get-html', async (req, res) => {


    var errorStatus = false;
    do {
    const browser  = await puppeeter.launch({
        headless: false,
        // ignoreHTTPSErrors: true,
        slowMo:250,
        args: [
            '--no-sandbox',
            // '--disable-setuid-sandbox',
            // '--disable-dev-shm-usage',
            // '--disable-accelerated-2d-canvas',
            // '--disable-gpu',
            // '--window-size=1920x1080',
            // `--disk-cache-size=0`
            `--proxy-server=socks5://127.0.0.1:9050`,


        ]    });

       
   const page =  await browser.newPage();

   await page.setViewport({width:1280,height:800});
   // await page.setUserAgent(UA.GET());
   await page.setJavaScriptEnabled(false);
   await page.setRequestInterception(true);


   page.on('request', request => {
       if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
           request.abort();
       } else {
           request.continue();
       }
   });
    await page.goto(req.query.url);

    let title = await page.title();

    if(title === 'Robot Check')
    {
        UACounter++;
        UA.Refresh();
        console.log('We got the ROBOT');
        // throw new Error('ROBOT Cought us');
    }


    if(title.toLowerCase().indexOf('something went wrong') !=-1){

        console.log('Something went wrong');
        UACounter++;
        UA.Refresh();
        // throw new Error('Something went wrong');

    }

    if(UACounter > 10){

        await browser.close();
        errorStatus =  true;

        TOR.Refresh();
    }



    await res.send({
        'html' : await   page.evaluate(() => document.body.innerHTML)
    });

    await browser.close();
}while(errorStatus);
});

app.listen(3333, () => {
  console.log('Listening on port 3333');
});
