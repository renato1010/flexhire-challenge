import { Money, RateMode } from "@/gql/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

// conver from Enums type to string literals union
type LocalModeType = `${RateMode}`;
type MapRateModeToRate = Map<
  LocalModeType,
  {
    centsMultiplier: number;
    short: string;
  }
>;
// const mapRateModeToRate = new Map([
//   ["year", { centsMultiplier: 100_000, short: "k" }],
//   ["month", { centsMultiplier: 100_000, short: "k" }],
//   ["week", { centsMultiplier: 100, short: "" }],
//   ["day", { centsMultiplier: 100, short: "" }],
//   ["hour", { centsMultiplier: 100, short: "" }],
// ]) satisfies MapRateModeToRate;

export const capitalizeFirstLetter = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
export const positionTypesFormat = (val: string[]) => {
  const length = val.length;
  if (!length) return "";
  switch (true) {
    case length === 1:
      return capitalizeFirstLetter(val[0]);
      break;
    case length === 2:
      return `${capitalizeFirstLetter(val[0])} and ${capitalizeFirstLetter(val[1])}`;
      break;
    case length > 2:
      return val.map((word) => capitalizeFirstLetter(word)).join(",");
      break;
    default:
      return "";
  }
};

const exhaustiveNeverAssert = (val: never): never => {
  throw new Error("Not exhaustive switch loop");
};
const rateModeToTimely = (mode: RateMode) => {
  const localMode: LocalModeType = mode;
  switch (localMode) {
    case "year":
      return "annual";
      break;
    case "month":
      return "monthly";
      break;
    case "week":
      return "weekly";
      break;
    case "day":
      return "daily";
      break;
    case "hour":
      return "hourly";
      break;
    default:
      exhaustiveNeverAssert(localMode);
  }
};

// common chunk for all get-pay funcs
const getPayFormatted = (minRate: Money, maxRate: Money, rateMode: LocalModeType, map: MapRateModeToRate) => {
  const { centsMultiplier: multiplier, short } = map.get(rateMode)!;
  const min = `${minRate.currency.symbol}${Math.floor(minRate.cents * multiplier)}${short}`;
  const max = `${maxRate.currency.symbol}${Math.floor(maxRate.cents * multiplier)}${short}`;
  return `${min} to ${max}`;
};
export const getAnnualPay = (
  maxRate: Maybe<Money>,
  minRate: Maybe<Money>,
  rateMode: LocalModeType = "year"
): string => {
  if (!maxRate || !minRate || !rateMode) {
    return "";
  }
  const mapRateModeToRate = new Map<LocalModeType, { centsMultiplier: number; short: string }>([
    ["year", { centsMultiplier: 1 / 100_000, short: "k" }],
    ["month", { centsMultiplier: 12 / 100_000, short: "k" }],
    ["week", { centsMultiplier: 52 / 100_000, short: "k" }],
    ["day", { centsMultiplier: 260 / 100_000, short: "k" }],
    ["hour", { centsMultiplier: 2080 / 100_000, short: "k" }],
  ]);
  const format = getPayFormatted(minRate, maxRate, rateMode, mapRateModeToRate);
  return `${format}/annual`;
};

export const getMonthlyPay = (
  maxRate: Maybe<Money>,
  minRate: Maybe<Money>,
  rateMode: LocalModeType = "month"
): string => {
  if (!maxRate || !minRate || !rateMode) {
    return "";
  }
  const mapRateModeToRate = new Map<LocalModeType, { centsMultiplier: number; short: string }>([
    ["year", { centsMultiplier: 1 / (100_000 * 12), short: "k" }],
    ["month", { centsMultiplier: 1 / 100_000, short: "k" }],
    ["week", { centsMultiplier: 4 / 100_000, short: "k" }],
    ["day", { centsMultiplier: 20 / 100_000, short: "k" }],
    ["hour", { centsMultiplier: 160 / 100_000, short: "k" }],
  ]);
  const format = getPayFormatted(minRate, maxRate, rateMode, mapRateModeToRate);
  return `${format}/monthly`;
};

export const getWeeklyPay = (
  maxRate: Maybe<Money>,
  minRate: Maybe<Money>,
  rateMode: LocalModeType = "week"
): string => {
  if (!maxRate || !minRate || !rateMode) {
    return "";
  }
  const mapRateModeToRate = new Map<LocalModeType, { centsMultiplier: number; short: string }>([
    ["year", { centsMultiplier: 1 / (100 * 52), short: "" }],
    ["month", { centsMultiplier: 1 / (100 * 4), short: "" }],
    ["week", { centsMultiplier: 1 / 100, short: "" }],
    ["day", { centsMultiplier: 5 / 100, short: "" }],
    ["hour", { centsMultiplier: 40 / 100, short: "" }],
  ]);
  const format = getPayFormatted(minRate, maxRate, rateMode, mapRateModeToRate);
  return `${format}/weekly`;
};

export const getDailyPay = (
  maxRate: Maybe<Money>,
  minRate: Maybe<Money>,
  rateMode: LocalModeType = "day"
): string => {
  if (!maxRate || !minRate || !rateMode) {
    return "";
  }
  const mapRateModeToRate = new Map<LocalModeType, { centsMultiplier: number; short: string }>([
    ["year", { centsMultiplier: 1 / (100 * 260), short: "" }],
    ["month", { centsMultiplier: 1 / (100 * 20), short: "" }],
    ["week", { centsMultiplier: 1 / (100 * 5), short: "" }],
    ["day", { centsMultiplier: 1 / 100, short: "" }],
    ["hour", { centsMultiplier: 8 / 100, short: "" }],
  ]);
  const format = getPayFormatted(minRate, maxRate, rateMode, mapRateModeToRate);
  return `${format}/daily`;
};

export const compensationFormat = (
  rate: Maybe<Money>,
  minRate: Maybe<Money>,
  rateMode: Maybe<RateMode>
): string => {
  if (!rate || !minRate || !rateMode) {
    return "";
  }
  const localRateMode: LocalModeType = rateMode;
  const yearly = getAnnualPay(rate, minRate, localRateMode);
  const daily = getDailyPay(rate, minRate, localRateMode);
  return `${yearly} - ${daily}`;
};
