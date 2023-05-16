require("dotenv").config();
const axios = require('axios');

//might not need?
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


//symbol lookup
const getCompanySymbols = async(params) => {
    const { q } = params;

    try { 
        const response = await axios.get(`https://finnhub.io/api/v1/search?q=${q}&token=${process.env.FINNHUB_TOKEN}`);
        return response.data;
    } catch (error){
        console.error(error);
        throw new Error ('error retrieving data from API')
    }
}

//get stock quote
const getStockQuote = async(params) => {
    const { symbol } = params;
    const uppercased = symbol.toUpperCase();

    try { 
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${uppercased}&token=${process.env.FINNHUB_TOKEN}`);
        return response.data;
    } catch (error){
        console.error(error);
        throw new Error ('error retrieving data from API')
    }
}


module.exports = {
    getCompanySymbols,
    getStockQuote
  }