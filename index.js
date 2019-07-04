const express = require('express');

const puppeeter =  require('puppeteer');
const UA =  require('./UA');
const TOR = require('./TOR.js');
const app = express();

var UACounter = 0;


app.get('/get-html', async (req, res) => {


    let page;
    var errorStatus = false;
    do {
    const browser  = await puppeeter.launch({
        headless: true,
        // ignoreHTTPSErrors: true,
        slowMo:250,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--ignore-certificate-errors`,
            // '--disable-dev-shm-usage',
            // '--disable-accelerated-2d-canvas',
            // '--disable-gpu',
            // '--window-size=1920x1080',
            // `--disk-cache-size=0`
            `--proxy-server=socks5://127.0.0.1:9050`,


        ]    });

       
   page =  await browser.newPage();

   await page.setViewport({width:1280,height:800});
   await page.setUserAgent(UA.GET());
//    await page.setJavaScriptEnabled(false);
//    await page.setRequestInterception(true);


//    page.on('request', request => {
//        if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
//            request.abort();
//        } else {
//            request.continue();
//        }
//    });
    await page.goto(req.query.url, {
        waitUntil:'domcontentloaded'
    });

    // await page.waitForNavigation();
    let title = await page.title();

    if(title === 'Robot Check')
    {
        UACounter++;
        UA.Refresh();
        console.log('We got the ROBOT');
        errorStatus =  true;

        // throw new Error('ROBOT Cought us');
    }


    if(title.toLowerCase().indexOf('something went wrong') !=-1){

        console.log('Something went wrong');
        UACounter++;
        UA.Refresh();
        errorStatus =  true;

        // throw new Error('Something went wrong');

    }

   


    html = await   page.evaluate(() => document.body.innerHTML);
    await page.close();

    if(!errorStatus){


        await browser.close();

    await res.send({
        'html' : html 
    });

    break;
    }else{

    
    // await browser.close();
    }

    if(UACounter > 4){

        await browser.close();
        errorStatus =  true;

        TOR.Refresh();
    }
}while(errorStatus);
});

app.listen(3333, () => {
  console.log('Listening on port 3333');
});
