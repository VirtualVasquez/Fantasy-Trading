# Stonk: Fantasy Stock Trading

This is a application is built with the PERN stack - PostgreSQL, Express, React, Node.
It also utilizes the [Finnhub API](https://finnhub.io/docs/api/introduction) and the [Financial Modeling Prep API](https://site.financialmodelingprep.com/developer/docs/#Ticker-Search)
Create an account and start chatting [here](https://stonks-9too.onrender.com)
The app is hosted on render.com, and its database on elephantsql.com.

![login](/screenshots/login.png)

When you first create an account, you'll be granted an imaginary $100,000 to purchases stocks with.

![home](/screenshots/home.png)

You can search companies you'd like to purchase stock from on the Trade page.

![search](/screenshots/search.png)

When you've found the one you want to purchase, you can click on the 'Quote' button to have a modal appear. So long as you have the necessary funds, you can purchase as many shares as you'd like.

![quote](/screenshots/quote.png)

All companies for which you currently posses stocks for will appear on the homepage, along with a summary of your current account's value, cash balance, market value, base cost, and gain/loss. You can also buy/sell shares from the Home page for these companies by clicking the respective row in the "My Assets" table.

![assets](/screenshots/assets.png)

## Installation and Setup

If you'd like to download the repo for yourself to play with, you'll need to run `npm install` in both the `client` and `server` directories.

You will also need to setup an access token secret for JSON Web Tokens, a Financial Modeling Prep Key to be able to lookup companies on the stock market via NYSE symbol or their company name, and a Finnhub API Token to get quotes for stocks.

Afterwards, you'll need to recreate the tables for the application. The code needed to do so is included in the `/server/sqlseeds` folder in the `startup.sql` file. You can do this from an application such as pgAdmin or from an SQL Shell. An `env-example.txt` file is included in the `server` folder as a reference for the environment variables that are needed for the server to to connect to the database afterwards. You'll need to pass these values in a `.env` file of your own in the same folder. 

Once all of that is setup, run `npm run start` at the root of the project.

## Road Map

There are a number of features I would like to add or improve to the project to make it more robust.

- Improve the design of the application. It's rather barebones in its current state.
- Speaking of design, a more mobile-responsive design would definitely be a part of that overhaul.
- Deliver confirmation/error messages to the user for the login, account creation, and purchasing of shares where appropriate.
- Improve the use of JSON Web Tokens. The application is not currently leveraging the use of refresh tokens, only access tokens.

## Technologies Used

- Frontend
    - Axios
    - Bootstrap
    - Financial Model Prep API
    - Finnhub API
    - React
    - React-Router-Dom
    - SASS 

- Backend
    - Body-parser
    - DotEnv
    - Express.js
    - Node.js
    - PostgreSQL

## Author

**Melvin Vasquez** - *Full-Stack Software Developer* - [Website](https://melvinvasquez.com/) | [LinkedIn](https://www.linkedin.com/in/melvin-vasquez/)