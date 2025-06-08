declare module "lightweight-charts" {
  export interface CandlestickData {
    time: UTCTimestamp;
    open: number;
    high: number;
    low: number;
    close: number;
  }

  export interface CandleData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
  }

  export type UTCTimestamp = number;

  export enum ColorType {
    Solid = "solid",
    VerticalGradient = "gradient",
  }

  export interface ChartOptions {
    layout?: {
      textColor?: string;
      background?: {
        type: ColorType;
        color: string;
      };
    };
    grid?: {
      vertLines?: { color: string };
      horzLines?: { color: string };
    };
    timeScale?: {
      timeVisible?: boolean;
      secondsVisible?: boolean;
    };
    width?: number;
    height?: number;
  }

  export interface CandlestickSeriesOptions {
    upColor?: string;
    downColor?: string;
    borderVisible?: boolean;
    wickUpColor?: string;
    wickDownColor?: string;
  }

  export interface IChartApi {
    addSeries(
      seriesType: any,
      options?: CandlestickSeriesOptions
    ): ICandlestickSeriesApi;
    applyOptions(options: ChartOptions): void;
    timeScale(): ITimeScaleApi;
    remove(): void;
  }

  export interface ICandlestickSeriesApi {
    setData(data: CandlestickData[]): void;
  }

  export interface ITimeScaleApi {
    getVisibleLogicalRange(): any;
    setVisibleLogicalRange(range: any): void;
  }

  export const CandlestickSeries: any;

  export function createChart(
    container: HTMLElement,
    options?: ChartOptions
  ): IChartApi;
}
declare module "lightweight-charts";
