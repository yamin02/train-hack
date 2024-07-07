// const puppeteer = require("puppeteer-core");
// var chrome_dir = "/usr/bin/chromium";
// var routes = ["Dhaka","Chattogram"] ;

// (async () => {
//   const browser = await puppeteer.launch({
//      executablePath: "/usr/bin/chromium",
//      headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto("https://eticket.railway.gov.bd/login");
//   await page.type("#mobile_number", "01818672900");
//   await page.type("#password", "chandanpura");
//   await page.click(".login-form-submit-btn");
//   await page.waitForSelector(".railway-ticket-search-submit-btn");

//     const url = `https://eticket.railway.gov.bd/booking/train/search?fromcity=${routes[0]}&tocity=${routes[1]}&doj=09-Jul-2024&class=SNIGDHA`;
//     //await page.waitForTimeout(3000);

//     await page.goto(url);
//     await page.waitForSelector(".book-now-btn");
//     var bookbtn = await page.$$(".book-now-btn");
//     bookbtn[6].click();
//     await page.waitForSelector("#select-bogie");
//     await page.select('#select-bogie','4')
//     await page.waitForSelector('[Title="NEO-17"]');
//     try { 
//         await page.click('[Title="NEO-11"]')
//         await page.click('[Title="NEO-12"]')
//         await page.click('[Title="NEO-13"]')
//         await page.click('[Title="NEO-14"]')

//     } catch (e) { console.log(e); }
//     console.log("total", bookbtn.length);

// })();




const puppeteer = require("puppeteer-core");
const routes = ["Dhaka", "Chattogram"];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://eticket.railway.gov.bd/login")
    .then(() => page.type("#mobile_number", "01818672900"))
    .then(() => page.type("#password", "chandanpura"))
    .then(() => page.click(".login-form-submit-btn"))
    .then(() => page.waitForSelector(".railway-ticket-search-submit-btn"));

  const url = `https://eticket.railway.gov.bd/booking/train/search?fromcity=${routes[0]}&tocity=${routes[1]}&doj=09-Jul-2024&class=SNIGDHA`;

  for(var i = 1 ; i < 50 ; i=i+4){
    var page2 = await browser.newPage()
    await page2.goto(url)
    .then(() => page2.waitForSelector(".book-now-btn"))
    .then(() => page2.$$(".book-now-btn"))
    .then(bookbtn => {
      bookbtn[6].click();
      return page2.waitForSelector("#select-bogie");
    })
    .then(() => page2.select('#select-bogie', '4'))
    .then(() => page2.waitForSelector('[Title="NEO-27"]'))
    .then(() => Promise.all([
      page2.click(`[Title="NEO-${i}"]`),
      page2.click(`[Title="NEO-${i+1}"]`),
      page2.click(`[Title="NEO-${i+2}"]`),
      page2.click(`[Title="NEO-${i+3}"]`)
    ]))
    .catch(e => console.log(e));
  }
  

  console.log("Script executed successfully");

  // Uncomment the following line to close the browser when done
  // await browser.close();
})();
