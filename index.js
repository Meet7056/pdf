const app = require("express")();

let chrome = {};
let puppeteer;

const isProduction = true

if (isProduction) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

app.get("/api", async (req, res) => {
  let options = {};

  if (isProduction) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    let browser = await puppeteer.launch(options);

    let page = await browser.newPage();
    await page.goto("https://www.google.com");
    res.send(await page.title());
  } catch (err) {
    console.error(err);
    return null;
  }
});

app.get("/", async (req, res) => {
  let options = {};

  if (isProduction) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    if (isProduction) {
      
    res.send("using production")

  }else{
    res.send("using development")
  }

  } catch (err) {
    res.send("hello I am mj, theowing error")
    return null;
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

module.exports = app;
