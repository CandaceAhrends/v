import "./App.css";
import CandlestickChart from "./components/CandlestickChart";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [params, setParams] = useState({
    ticker: "TSLA",
    startDate: "2025-06-06",
    endDate: "2025-06-06",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleHeaderChange = (newParams: typeof params) => {
    setParams(newParams);
    setSubmitted(true);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1E1E1E",
        flex: 1,
      }}
    >
      <Header
        ticker={params.ticker}
        startDate={params.startDate}
        endDate={params.endDate}
        onChange={handleHeaderChange}
      />
      {submitted ? (
        <CandlestickChart
          ticker={params.ticker}
          startDate={params.startDate}
          endDate={params.endDate}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#A0A0A0",
            background: "#181818",
            border: "2px solid #26a69a",
            borderRadius: "8px",
            marginTop: 32,
          }}
        >
          Please select a ticker and date range, then hit Submit to load the
          chart.
        </div>
      )}
    </div>
  );
}

export default App;
