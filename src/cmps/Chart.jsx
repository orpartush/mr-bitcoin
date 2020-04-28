import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const Chart = ({ chartData }) => {
  const initialData = {
    labels: [],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const getLabels = () => {
      const datesX = chartData.values.map(item =>
        moment(item.x).format('MMM Do YY')
      );
      return datesX;
    };

    const getValues = () => {
      const valuesY = chartData.values.map(item => item.y);
      return valuesY;
    };

    const labels = getLabels();
    const values = getValues();
    const dataCopy = { ...data };
    dataCopy.labels = [...labels];
    dataCopy.datasets[0].data = [...values];
    dataCopy.datasets[0].label = chartData.description;

    setData(dataCopy);
  }, [chartData]);

  const chartTitle = chartData.name;
  return (
    <div className="chart">
      <h1>{chartTitle}</h1>
      <Line className="line-chart" data={data} />
    </div>
  );
};

Chart.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default Chart;
