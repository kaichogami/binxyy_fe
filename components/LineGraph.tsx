import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineGraphProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: 'Price',
                data: data.values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'year',
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">MSFT Price Chart</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph;
