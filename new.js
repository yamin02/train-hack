const puppeteer = require("puppeteer-core");
const routes = ["Dhaka", "Chattogram"];
const date = "20-Oct-2024";
// const profileInfo = require("./profile.json");

function delay(ms) {
  console.log("waiting before break");
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  while (true) {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium",
      headless: false,
    });

    const page = await browser.newPage();
    try{
    page.setDefaultTimeout(30 * 1000);
    await page
      .goto("https://eticket.railway.gov.bd/login")
      .then(() => page.type("#mobile_number", "[]"))
      .then(() => page.type("#password", "[]"))
      .then(() => page.click(".login-form-submit-btn"))
      .then(() => page.waitForSelector(".railway-ticket-search-submit-btn"))
      .then(() => console.log("Login done Successfully"));
    }catch(e){
      console.log("something messed up");
      continue;
    }  

    const url = `https://eticket.railway.gov.bd/booking/train/search?fromcity=${routes[1]}&tocity=${routes[0]}&doj=${date}&class=S_CHAIR`;

    while (true) {
      try {
        // select the Div not the button selector (check with queryselecter )
        var selectorBtn = '#search_list_sec > div.container > div > div.col-lg-9.col-md-8.col-sm-12.col-xs-12.px-xs-1 > app-single-trip:nth-child(6) > div > div.trip-collapsible.trip-div.trip-collapsed > div.seat-classes-row.d-flex > div.single-seat-class.selected-seat-type.seat-available-wrap.ng-star-inserted > div.seat-availability-box > div.book-now-btn-wrapper.ng-star-inserted' ;
        var page2 = await browser.newPage();
        page2.setDefaultTimeout(30 * 1000);
        await page2
          .goto(url)
          .then(() => page2.waitForSelector(selectorBtn))
          .then(() => page2.click(selectorBtn))
          .then(() => page2.waitForSelector("#select-bogie"))
          .then(() => page2.select("#select-bogie", "7"))     //ADD BOGIE NUMBER value HERE KA,KHA etc
          .then(() => page2.waitForSelector(`.btn-seat.seat-available`))
          .catch((e) => {
          console.log("relax")
          throw new Error("restartLoop");   
          })
          .then(() => page2.$$(`.btn-seat.seat-available`))
          .then((seatAvailable) => {
            console.log("Available Seats = ", seatAvailable.length);
            if (seatAvailable.length < 1) {
              throw new Error("noSeat");
            }
            return seatAvailable;
          })
          .then((seatBtn) => {
            const numberofSeatsLeft = seatBtn.length; 
          
            // Only click the number of available seats
            const clickPromises = [];
            for (let i = 0; i < Math.min(numberofSeatsLeft, 4); i++) {
              clickPromises.push(
                seatBtn[i]
                  .click()
                  .catch((e) => console.log("This ticket is booked"))
              );
            }
          
            return Promise.all(clickPromises);
          })
          
          .then(() => console.log("Successfully reserved 4 seats"));
      } catch (e) {
       // console.log(e);
        console.log("The Tickets Have been Booked");

        if (e.message === "restartLoop") {
          console.log("Restarting the inner loop...");
          continue; // Restart the inner while loop
        }

        if (e.message === "noSeat") {
          await delay(0.1 * 60 * 1000);
          break; // Exit the inner while loop
        }
      }
    }
    await browser.close();
  }
})();
