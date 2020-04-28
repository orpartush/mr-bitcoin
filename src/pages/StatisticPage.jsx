import React, { Component } from 'react'
import Chart from '../cmps/Chart';
import { BitcoinService } from '../services/BitcoinService';

export class StatisticPage extends Component {
  state = {
    marketPriceData: null,
    tradeVolumeData: null
  }

  componentDidMount() {
    this.getMarketData();
    this.getTradeData();
  }

  getMarketData = async () => {
    const marketData = await BitcoinService.getMarketPrice();
    this.setState({ marketPriceData: marketData });  
  }
  
  getTradeData = async () => {
    const tradeData = await BitcoinService.getTradeVolume();
    this.setState({ tradeVolumeData: tradeData });
  }

  render() {
    const { marketPriceData, tradeVolumeData } = this.state;
  if (!marketPriceData || !tradeVolumeData) return <p>Loading...</p>;
    return (
      <div className="statistic-page">
        <Chart chartData={marketPriceData} />
        <Chart chartData={tradeVolumeData} />
      </div>
    )
  }
}

export default StatisticPage
