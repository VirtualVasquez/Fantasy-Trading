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

If you'd like to download the repo for yourself to play with, follow these steps:

### For ALL forms of setup (required)

1. Set up an access token secret for JSON Web Tokens, a Financial Modeling Prep Key, and a Finnhub API Token.
2. Create a `.env` file at the root project directory with your environment variables. Reference `env-example.txt` for guidance as to what values are needed in the `.env` file(s), including API keys and tokens.

**NOTE:** if you use Docker for both a local deployment and a production deployment, it is highly advised to create two separate `.env` files. Your local one should be set to `.env` and the production one to `production.env`.

### Local Development

1. Run `npm install` in both the `client` and `server` directories.
2. Recreate the tables for the application using `/server/sqlseeds/startup.sql`.
3. Run `npm run start` to run the application locally.

### Local Deployment with Docker (recommended)

1. Run `docker-compose -f docker-compose-local.yml up -d` at the root of the project.
2. Access the app at the specified production URL (usually localhost:3000).
3. To stop instances of the app running in Docker, run `docker-compose -f docker-compose-local.yml down`

### Production Deployment with Docker

1. Run `docker-compose -f docker-compose-production.yml up -d` at the root of the project.
2. Access the app at the specified production URL (usually localhost:3000).
3. To stop instances of the app running in Docker, run `docker-compose -f docker-compose-production.yml down`

## Road Map

There are a number of features I would like to add or improve to the project to make it more robust.

- Improve the design of the application. It's rather barebones in its current state.
- Speaking of design, a more mobile-responsive design would definitely be a part of that overhaul.
- Deliver confirmation/error messages to the user for the login, account creation, and purchasing of shares where appropriate.
- Improve the use of JSON Web Tokens. The application is not currently leveraging the use of refresh tokens, only access tokens.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js.
- **PostgreSQL**: Open-source relational database management system.

### Backend Tools

- **Body-parser**: Middleware for parsing incoming request bodies.
- **DotEnv**: Zero-dependency module that loads environment variables from a .env file.
- **Docker**: Containerization tool used for packaging the application and its dependencies.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React-Router-Dom**: Declarative routing for React applications.
- **SASS**: Syntactically Awesome Stylesheets for enhancing CSS.
- **Axios**: Promise-based HTTP client for making requests.
- **Bootstrap**: Frontend framework for responsive and mobile-first design.

### APIs

- **Financial Model Prep API**: API for financial data related to stocks and companies.
- **Finnhub API**: Real-time stock market data API.

## Author

**Melvin Vasquez** - *Full-Stack Software Developer* - [Website](https://melvinvasquez.com/) | [LinkedIn](https://www.linkedin.com/in/melvin-vasquez/)