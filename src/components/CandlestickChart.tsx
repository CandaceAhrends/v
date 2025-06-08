import React, { useEffect, useRef, useState } from "react";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import type { UTCTimestamp } from "lightweight-charts";
import { wsUrl } from "../utils/websocket";

interface CandlestickChartProps {
  ticker: string;
  startDate: string;
  endDate: string;
}

const CandlestickChart = ({
  ticker,
  startDate,
  endDate,
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    setData([]);

    console.log("got URL =>", wsUrl);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.onopen = () => ws.send(JSON.stringify({ ticker, startDate, endDate }));
    ws.onmessage = (event) => {
      try {
        const newCandles = JSON.parse(event.data);
        if (Array.isArray(newCandles)) setData(newCandles);
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    return () => ws.close();
  }, [ticker, startDate, endDate]);

  useEffect(() => {
    if (!chartContainerRef.current || !Array.isArray(data) || data.length === 0)
      return;

    const chartOptions = {
      layout: {
        textColor: "#E0E0E0",
        background: { type: ColorType.Solid, color: "#1E1E1E" },
      },
      grid: {
        vertLines: { color: "#2D2D2D" },
        horzLines: { color: "#2D2D2D" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    const candleData = data.map((item) => ({
      time: (item.time / 1000) as UTCTimestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    // Save the current visible range
    const currentRange = chart.timeScale().getVisibleLogicalRange();

    candlestickSeries.setData(candleData);

    // Restore the previous visible range if it exists
    if (currentRange) {
      chart.timeScale().setVisibleLogicalRange(currentRange);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div
        data-testid="loading-chart"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1E1E1E",
          alignItems: "center",
          justifyContent: "center",
          color: "#E0E0E0",
        }}
      >
        Loading chart data...
      </div>
    );
  }

  return (
    <div data-testid="candlestick-chart">
      <div
        data-testid="chart-header"
        style={{
          padding: "20px 40px",
          backgroundColor: "#252525",
          borderBottom: "1px solid #3D3D3D",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          data-testid="chart-title"
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 600,
            color: "#E0E0E0",
          }}
        >
          {ticker} Stock Price
        </h1>
        <p
          data-testid="chart-subtitle"
          style={{
            margin: "8px 0 0 0",
            fontSize: "14px",
            color: "#A0A0A0",
          }}
        >
          Real-time 1-Minute Candlestick Chart
        </p>
      </div>
      <div
        ref={chartContainerRef}
        data-testid="chart-container"
        style={{
          flex: 1,
          padding: "20px",
          minHeight: 0,
          height: "500px",
          border: "2px solid #26a69a",
          borderRadius: "8px",
          background: "#181818",
        }}
      />
    </div>
  );
};

export default CandlestickChart;
