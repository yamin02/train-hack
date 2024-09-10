// this is for hacking the all the tickets of the train


const puppeteer = require("puppeteer-core");
const routes = ["Dhaka", "Chattogram"];
const date = "17-Aug-2024" ;
const profileInfo = require('./profile.json') ;

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

  // for(var i = 1 ; i <= 60 ; i=i+4){
  var bogieNum = 10 ;

  while(true){ 


    var selectorBtn = '#search_list_sec > div.container > div > div.col-lg-9.col-md-8.col-sm-12.col-xs-12.px-xs-1 > app-single-trip:nth-child(7) > div > div.trip-collapsible.trip-div.trip-collapsed-height-auto > div.seat-classes-row.d-flex > div:nth-child(1) > div.seat-availability-box > div.book-now-btn-wrapper.ng-star-inserted > button';

    var page2 = await browser.newPage()
    page2.setDefaultTimeout(6*1000)
    await page2.goto(url)
    .then(() => page2.waitForSelector(selectorBtn))
    // Take the selector from developer options Copy > Copy Selector
    .then(() => page2.click(selectorBtn))
    .then(()=> page2.waitForSelector('#select-bogie'))   
    // this is to select bogie number from dropdown list (ka, kha , ...)
    .then(() => page2.select('#select-bogie', `${bogieNum}`)) 
    .then(() => page2.waitForSelector(`.btn-seat.seat-available`)).catch(e => bogieNum = bogieNum +1 )     
    .then(() => page2.$$(`.btn-seat.seat-available`))
    .then((seatBtn) => Promise.all([
      seatBtn[0].click().catch(e => bogieNum = bogieNum+1 , console.log('All seats are booked') ) ,
      seatBtn[1].click().catch(e => console.log('All seats are booked')) ,
      seatBtn[2].click().catch(e => console.log('All seats are booked')) ,
      seatBtn[3].click().catch(e => console.log('All seats are booked')) ,
    ]))
    .then(()=> page2.close() )
    .catch(e => {
        // console.log(e);
        page2.close();
        console.log(`This is bogie Num = ${bogieNum}`)
      console.log('There was an error somewhere')
  });

}
  

  console.log("Script executed successfully");

  // await browser.close();
})(profileInfo);
