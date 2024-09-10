const puppeteer = require("puppeteer-core");
const routes = ["Dhaka", "Chattogram"];
const date = "15-Sep-2024";
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
    await page
      .goto("https://eticket.railway.gov.bd/login")
      .then(() => page.type("#mobile_number", "01818672900"))
      .then(() => page.type("#password", "chandanpura"))
      .then(() => page.click(".login-form-submit-btn"))
      .then(() => page.waitForSelector(".railway-ticket-search-submit-btn"))
      .then(() => console.log("Login done Successfully"));

    const url = `https://eticket.railway.gov.bd/booking/train/search?fromcity=${routes[0]}&tocity=${routes[1]}&doj=${date}&class=SNIGDHA`;

    while (true) {
      try {
        // select the Div not the button selector
        var selectorBtn = '#search_list_sec > div.container > div > div.col-lg-9.col-md-8.col-sm-12.col-xs-12.px-xs-1 > app-single-trip:nth-child(2) > div > div.trip-collapsible.trip-div.trip-collapsed > div.seat-classes-row.d-flex > div:nth-child(2) > div.seat-availability-box > div.book-now-btn-wrapper.ng-star-inserted' ;
        var page2 = await browser.newPage();
        page2.setDefaultTimeout(6 * 1000);
        await page2
          .goto(url)
          .then(() => page2.waitForSelector(selectorBtn))
          .then(() => page2.click(selectorBtn))
          .then(() => page2.waitForSelector("#select-bogie"))
          .then(() => page2.select("#select-bogie", "7"))     //ADD BOGIE NUMBER value HERE KA,KHA etc
          .then(() => page2.waitForSelector(`.btn-seat.seat-available`))
          .catch((e) => console.log("relax"))
          .then(() => page2.$$(`.btn-seat.seat-available`))
          .then((seatAvailable) => {
            console.log("Available Seats = ", seatAvailable.length);
            if (seatAvailable.length < 5) {
              throw new Error("noSeat");
            }
            return seatAvailable;
          })
          .then((seatBtn) =>
            Promise.all([
              seatBtn[0]
                .click()
                .catch((e) => console.log("This ticket is booked")),
              seatBtn[1]
                .click()
                .catch((e) => console.log("This ticket is booked")),
              seatBtn[2]
                .click()
                .catch((e) => console.log("This ticket is booked")),
              seatBtn[3]
                .click()
                .catch((e) => console.log("This ticket is booked")),
            ])
          )
          .then(() => console.log("Successfully reserved 4 seats"));
      } catch (e) {
        console.log(e);
        console.log("The Tickets Have been Booked");
        if (e.message === "noSeat") {
          await delay(0.3 * 60 * 1000);
          break; // Exit the inner while loop
        }
      }
    }
    await browser.close();
  }
})();
