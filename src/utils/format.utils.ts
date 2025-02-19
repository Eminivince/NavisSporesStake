import { formatUnits, parseUnits } from "viem";
import dayjs from "dayjs";
export const formattingUtils = {
  centerEllipsizeString: (
    input?: string | null,
    firstNumberChars = 5,
    lastNumberChart = 14
  ) => {
    if (!input) return "";
    if (input.length < 10) return input;
    return `${input.substring(0, firstNumberChars)}...${
      lastNumberChart > 0 ? input.slice(0 - lastNumberChart) : ""
    }`;
  },

  pad: (num: number) => {
    return num < 10 && num > 0 ? `0${num}` : num;
  },

  // toFixed: (value?: BigInt, decimal = 5) => {
  //   if (!value) return "";
  //   let remainder = value.mod(Number(`1e1${decimal}`));

  //   return utils.formatEther(value.sub(remainder));
  // },
  toLocalString: (value: string | number, toFixed = 5) => {
    const decimals = Number(value) > 1 ? 2 : toFixed;
    if (!value || parseFloat(value.toString()) == 0) return "0";
    let parts = value.toString().split(".");
    const leftDecimal = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const rightDecimal = parts[1];
    const zeroNumberAfterDecimal = -Math.floor(
      Math.log10(parseFloat(value.toString())) + 1
    );
    if (zeroNumberAfterDecimal >= 4) {
      const subscript = String(zeroNumberAfterDecimal)
        .split("")
        .map((digit) => String.fromCharCode(8320 + parseInt(digit)))
        .join("");
      return `${leftDecimal}.0${subscript}${
        rightDecimal?.slice(
          zeroNumberAfterDecimal,
          zeroNumberAfterDecimal + 4
        ) || ""
      }`;
    }
    value = parseFloat(parseFloat(value.toString()).toFixed(decimals));
    parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  },
  formatUnit: (value: BigInt | string, unit: number = 18) => {
    if (!value || parseFloat(value.toString()) === 0) return "0";
    if (unit < 0 || !unit) unit = 0;
    const bigNumberValue =
      typeof value === "bigint" ? value : BigInt(value.toString());
    return formatUnits(bigNumberValue, unit);
  },
  parseUnit: (value: string | number, unit: number = 18) => {
    if (!value || parseFloat(value.toString()) === 0) return BigInt(0);
    if (unit < 0 || !unit) unit = 0;
    return parseUnits(value.toString(), unit);
  },
  capitalized: (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  
};
export const formatDate = (timestamp: number) => {
  return dayjs.unix(timestamp).format("MMM DD, YYYY")
}