require('dotenv').config({ path: '../.env' });
const axios = require('axios');

//might not need?
const jwt = require('jsonwebtoken');

const pool = require('./dbConfig');

//symbol lookup
const getCompanySymbols = async(params) => {
    const { q } = params;

    try { 
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/search?query=${q}&limit=10&apikey=${process.env.FMP_API_KEY}`);
        return response.data;
    } catch (error){
        console.error(error);
        throw new Error ('error retrieving data from Finnhub API')
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