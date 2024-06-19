import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TypingResult from "../../models/TypingResult";

interface IProps extends ComponentPropsWithoutRef<"div"> {
  data: TypingResult;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatsChart = ({ data, className, ...props }: IProps) => {
  const chartRef = useRef<any>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const { width, height } = chartRef.current.getBoundingClientRect();
        setChartDimensions({ width, height });
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [chartRef]);

  const chartData = {
    labels: data.history.map((_, index) => index + 1),
    datasets: [
      {
        label: "",
        data: data.history,
        fill: false,
        borderColor: "#E2B714",
        backgroundColor: "#323437",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            return `wpm: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: false
        }
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: 'wpm'
        }
      }
    }
  };

  return (
    <div {...props} ref={chartRef} className={className}>
      {(chartDimensions.width && chartDimensions.height) && (
        <Line data={chartData} options={options} width={chartDimensions.width} height={chartDimensions.height} />
      )}
    </div>
  );
};

export default StatsChart;
