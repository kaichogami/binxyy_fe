import React, { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartDataset } from 'chart.js/auto';

interface BarGraphProps {
  data: {
    labels: string[];
    datasets: ChartDataset<'bar' | 'line'>[];
  };
  options?: any; // Optional to customize the chart options
  chartHeading: string;
  yLabel: string;
  y1Label: string;
  calculateGrowth: boolean;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, options, chartHeading, yLabel, y1Label, calculateGrowth }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const calculateGrowthRates = (data: number[]): number[] => {
    const growth: number[] = [];
    for (let i = 1; i < data.length; i++) {
      growth.push((data[i] - data[i - 1]) / data[i - 1]);
    }
    return growth;
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const datasets: ChartDataset<'bar' | 'line'>[] = [...data.datasets];

        if (calculateGrowth) {
          data.datasets.forEach((dataset) => {
            const growthRates = calculateGrowthRates(dataset.data as number[]);
            datasets.push({
              label: `${dataset.label} Growth`,
              data: [NaN, ...growthRates],
              type: 'line',
              borderColor: dataset.borderColor || 'black',
              yAxisID: 'y1',
            } as ChartDataset<'line'>);
          });
        }

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: datasets,
          },
          options: options || {
            scales: {
              x: {
                type: 'category',
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: yLabel,
                },
              },
              y1: {
                beginAtZero: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
                title: {
                  display: true,
                  text: y1Label,
                },
              },
            },
          },
        });
      }
    }
  }, [data, options, calculateGrowth]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{chartHeading}</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarGraph;


// import React from 'react';
// import BarGraph from './BarGraph';

// const data = {
//   labels: ['Q1 2020', 'Q2 2020', 'Q3 2020', 'Q4 2020'],
//   datasets: [
//     {
//       label: 'Capex',
//       data: [140, 160, 180, 200],
//       backgroundColor: 'blue',
//     },
//     {
//       label: 'Capex Industry',
//       data: [150, 170, 190, 180],
//       backgroundColor: 'orange',
//     },
//   ],
// };

// const options = {
//   scales: {
//     y: {
//       beginAtZero: true,
//       title: {
//         display: true,
//         text: 'Capex',
//       },
//     },
//     y1: {
//       beginAtZero: true,
//       position: 'right',
//       grid: {
//         drawOnChartArea: false,
//       },
//       title: {
//         display: true,
//         text: 'Growth Rate',
//       },
//     },
//   },
// };

// const App = () => (
//   <div>
//     <BarGraph
//       data={data}
//       options={options}
//       chartHeading="Capex per Quarter and Growth Rate"
//       yLabel="Capex"
//       y1Label="Growth Rate"
//       calculateGrowth={true}
//     />
//   </div>
// );

// export default App;