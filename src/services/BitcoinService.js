import axios from 'axios';
import { StorageService } from './StorageService';

export const BitcoinService = {
  getRate,
  getMarketPrice,
  getTradeVolume,
};

async function getRate(coins = 1) {
  try {
    const res = await axios.get(`
      https://blockchain.info/tobtc?currency=USD&value=${coins}
    `);
    const rate = res.data;
    return rate;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

async function getMarketPrice() {
  let marketPrice = StorageService.load('marketPrice');
  if (marketPrice) return marketPrice;
  try {
    marketPrice = await axios.get(`
      https://api.blockchain.info/charts/market-price?timespan=5weeks&rollingAverage=8hours&format=json&cors=true
    `);
    StorageService.store('marketPrice', marketPrice.data);
    return marketPrice.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

async function getTradeVolume() {
  let tradeVolume = StorageService.load('tradeVolume');
  if (tradeVolume) return tradeVolume;
  try {
    tradeVolume = await axios.get(`
    https://api.blockchain.info/charts/trade-volume?timespan=5weeks&rollingAverage=8hours&format=json&cors=true
  `);
    StorageService.store('tradeVolume', tradeVolume.data);
    return tradeVolume.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}
