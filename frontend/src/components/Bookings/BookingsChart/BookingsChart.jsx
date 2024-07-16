import React from 'react';
import { Bar } from 'react-chartjs-2';

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100
  },
  Normal: {
    min: 100,
    max: 200
  },
  Expensive: {
    min: 200,
    max: 10000000
  }
};

const BookingsChart = ({ bookings }) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Bookings',
        backgroundColor: 'rgba(220,220,220,0.5)',
        borderColor: 'rgba(220,220,220,0.8)',
        hoverBackgroundColor: 'rgba(220,220,220,0.75)',
        hoverBorderColor: 'rgba(220,220,220,1)',
        data: []
      }
    ]
  };

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    chartData.labels.push(bucket);
    chartData.datasets[0].data.push(filteredBookingsCount);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Bar data={chartData} />
    </div>
  );
};

export default BookingsChart;