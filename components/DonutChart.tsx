import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DonutChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  centerText: {
    value: string;
    label: string;
  };
}

const DonutChart: React.FC<DonutChartProps> = ({ data, centerText }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: {
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem: any) => {
                    const dataIndex = tooltipItem.dataIndex;
                    const datasetIndex = tooltipItem.datasetIndex;
                    const value = tooltipItem.raw;
                    const label = data.labels[dataIndex];
                    return `${label}: ${value}% (${data.datasets[datasetIndex].data[dataIndex]})`;
                  },
                },
              },
              legend: {
                display: false,
              },
            },
            cutout: '70%',
          },
          plugins: [{
            id: 'drawCenterText',
            beforeDraw: (chart) => {
              const { width, height, ctx } = chart;
              ctx.restore();
              const fontSize = (height / 114).toFixed(2);
              ctx.font = `${Number(fontSize)}em sans-serif`;
              ctx.textBaseline = 'middle';

              const text = centerText.value;
              const textX = Math.round((width - ctx.measureText(text).width) / 2);
              const textY = height / 2;

              ctx.fillText(text, textX, textY - 20);

              ctx.font = `${(Number(fontSize) / 2).toFixed(2)}em sans-serif`;
              const subText = centerText.label;
              const subTextX = Math.round((width - ctx.measureText(subText).width) / 2);
              ctx.fillText(subText, subTextX, textY + 10);
              ctx.save();
            },
          }]
        });
      }
    }
  }, [data, centerText]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Analyst Recommendations</h2>
      <canvas ref={chartRef} />
      <div className="mt-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 mr-2" style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></div>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
