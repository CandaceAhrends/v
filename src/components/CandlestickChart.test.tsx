/**
 * @jest-environment jsdom
 */

import { render, screen, act } from "@testing-library/react";
import CandlestickChart from "./CandlestickChart";
import React from "react";
import "@testing-library/jest-dom";

// mock the utils/websocket.ts
jest.mock("../utils/websocket", () => ({
  wsUrl: "ws://localhost:3005",
}));

// Mock WebSocket
class MockWebSocket {
  static instances: MockWebSocket[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: ((error: any) => void) | null = null;
  readyState = 1;
  close = jest.fn();
  send = jest.fn();
  constructor() {
    MockWebSocket.instances.push(this);
    setTimeout(() => this.onopen && this.onopen(), 0);
  }
}

(globalThis as any).WebSocket = MockWebSocket;

describe("CandlestickChart", () => {
  const dummyCandles = [
    { time: 1717699200000, open: 100, high: 110, low: 90, close: 105 },
    { time: 1717699260000, open: 105, high: 115, low: 100, close: 110 },
  ];

  it("renders chart and candles with dummy data", async () => {
    render(
      <CandlestickChart
        ticker="DUMMY"
        startDate="2024-06-06"
        endDate="2024-06-06"
      />
    );

    // Simulate receiving data from WebSocket
    await act(async () => {
      const ws = MockWebSocket.instances[0];
      ws.onmessage && ws.onmessage({ data: JSON.stringify(dummyCandles) });
    });

    // Check for chart title using test ID
    expect(screen.getByTestId("chart-title")).toBeInTheDocument();
    expect(screen.getByTestId("chart-title")).toHaveTextContent(
      "DUMMY Stock Price"
    );

    // Check for chart subtitle using test ID
    expect(screen.getByTestId("chart-subtitle")).toBeInTheDocument();
    expect(screen.getByTestId("chart-subtitle")).toHaveTextContent(
      "Real-time 1-Minute Candlestick Chart"
    );

    // Check for chart container using test ID
    expect(screen.getByTestId("chart-container")).toBeInTheDocument();
  });
});
