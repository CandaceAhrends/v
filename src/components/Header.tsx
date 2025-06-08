import React, { useState } from "react";

interface HeaderProps {
  ticker: string;
  startDate: string;
  endDate: string;
  onChange: (params: {
    ticker: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const Header: React.FC<HeaderProps> = ({
  ticker,
  startDate,
  endDate,
  onChange,
}) => {
  const [localTicker, setLocalTicker] = useState(ticker);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  // Keep local state in sync if props change
  React.useEffect(() => {
    setLocalTicker(ticker);
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [ticker, startDate, endDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({
      ticker: localTicker,
      startDate: localStartDate,
      endDate: localEndDate,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px 40px",
        backgroundColor: "#252525",
        borderBottom: "1px solid #3D3D3D",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: 600,
          color: "#E0E0E0",
        }}
      >
        Stock Chart
      </h1>
      <form
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
        onSubmit={handleSubmit}
      >
        <label style={{ color: "#A0A0A0" }}>
          Ticker:
          <input
            type="text"
            value={localTicker}
            onChange={(e) => setLocalTicker(e.target.value)}
            style={{
              marginLeft: 4,
              background: "#1E1E1E",
              color: "#E0E0E0",
              border: "1px solid #3D3D3D",
              borderRadius: 4,
              padding: "4px 8px",
              width: 80,
            }}
          />
        </label>
        <label style={{ color: "#A0A0A0" }}>
          Start Date:
          <input
            type="date"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
            style={{
              marginLeft: 4,
              background: "#1E1E1E",
              color: "#E0E0E0",
              border: "1px solid #3D3D3D",
              borderRadius: 4,
              padding: "4px 8px",
            }}
          />
        </label>
        <label style={{ color: "#A0A0A0" }}>
          End Date:
          <input
            type="date"
            value={localEndDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
            style={{
              marginLeft: 4,
              background: "#1E1E1E",
              color: "#E0E0E0",
              border: "1px solid #3D3D3D",
              borderRadius: 4,
              padding: "4px 8px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            marginLeft: 8,
            background: "#26a69a",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "6px 16px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Header;
