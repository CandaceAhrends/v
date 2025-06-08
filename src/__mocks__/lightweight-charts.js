export const createChart = jest.fn(() => ({
  addSeries: jest.fn(() => ({
    setData: jest.fn(),
  })),
  applyOptions: jest.fn(),
  timeScale: jest.fn(() => ({
    getVisibleLogicalRange: jest.fn(),
    setVisibleLogicalRange: jest.fn(),
  })),
  remove: jest.fn(),
}));

export const ColorType = {
  Solid: "solid",
  VerticalGradient: "gradient",
};

export const CandlestickSeries = {};

export const UTCTimestamp = Number;
