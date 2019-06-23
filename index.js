const express = require('express');

const puppeeter =  require('puppeteer');
const UA =  require('./UA');
const TOR = require('./TOR.js');
const app = express();

var UACounter = 0;


app.get('/get-html', async (req, res) => {

    const browser  = await puppeeter.launch({
        headless:true,
    });
   const page =  await browser.newPage();

    await page.goto(req.query.url);

    let title = await page.title();

    if(title === 'Robot Check')
    {
        UACounter++;
        UA.Refresh();
        console.log('We got the ROBOT');
        throw new Error('ROBOT Cought us');
    }


    if(title.toLowerCase().indexOf('something went wrong') !=-1){

        console.log('Something went wrong');
        UACounter++;
        UA.Refresh();
        throw new Error('Something went wrong');

    }

    if(UACounter > 10){
        TOR.Refresh();
    }



    await res.send({
        'html' : await   page.evaluate(() => document.body.innerHTML)
    });

    await browser.close();
});

app.listen(3333, () => {
  console.log('Listening on port 3333');
});
