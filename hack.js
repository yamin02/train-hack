
const puppeteer = require("puppeteer-core");
const routes = ["Dhaka", "Chattogram"];
const date = "17-Jul-2024" ;
const profileInfo = require('./profile.json') ;
// var [mobile , password ] = [ profileInfo.mobile , profileInfo.password]

(async (info) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://eticket.railway.gov.bd/login")
    .then(() => page.type("#mobile_number", profileInfo.mobile ))
    .then(() => page.type("#password",  profileInfo.password ))
    .then(() => page.click(".login-form-submit-btn"))
    .then(() => page.waitForSelector(".railway-ticket-search-submit-btn"));

  const url = `https://eticket.railway.gov.bd/booking/train/search?fromcity=${routes[1]}&tocity=${routes[0]}&doj=${date}&class=SNIGDHA`;

  for(var i = 1 ; i < 60 ; i=i+4){
    var bogieName = 'THO';
    var selector = '#search_list_sec > div.container > div > div.col-lg-9.col-md-8.col-sm-12.col-xs-12.px-xs-1 > app-single-trip:nth-child(7) > div > div.trip-collapsible.trip-div.trip-collapsed > div.seat-classes-row.d-flex > div:nth-child(2) > div.seat-availability-box > div.book-now-btn-wrapper.ng-star-inserted > button'
    var page2 = await browser.newPage()
    await page2.goto(url)
    .then(() => page2.waitForSelector(".book-now-btn"))
    // Take the selector from developer options Copy > Copy Selector
    .then(() => page2.click(selector))
    .then(()=> page2.waitForSelector('#select-bogie'))   
    // this is to select bogie number from dropdown list (ka, kha , ...)
    .then(() => page2.select('#select-bogie', '7'))      
    .then(() => page2.waitForSelector(`[Title="${bogieName}-27"]`))
    .then(() => Promise.all([
      page2.click(`[Title="${bogieName}-${i}"]`),
      page2.click(`[Title="${bogieName}-${i+1}"]`),
      page2.click(`[Title="${bogieName}-${i+2}"]`),
      page2.click(`[Title="${bogieName}-${i+3}"]`)
    ]))
    .catch(e => console.log(e));
  }
  

  console.log("Script executed successfully");

  // Uncomment the following line to close the browser when done
  // await browser.close();
})(profileInfo);
