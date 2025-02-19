import moment from 'moment';
import { serializeError } from "eth-rpc-errors";
import { DEFAULT_DECIMALS } from '@/common/configs';

export function ellipseAddress(address: string = '', width: number = 10): string {
  return `${String(address).slice(0, width)}...${String(address).slice(-width)}`;
}

export function ellipseAddressNFT(address: string = '', width1: number = 4, width2: number = 3): string {
  return `${String(address).slice(0, width1)}...${String(address).slice(-width2)}`;
}

function roundDownToDecimals(number: any, decimalPlaces: number) {
  const powerOfTen = Math.pow(10, decimalPlaces);
  return Math.floor(Number(number) * powerOfTen) / powerOfTen;
}

function formatDecimal(number: any, decimalPlaces: number = 4) {
  if (isNaN(number) || isNaN(decimalPlaces)) {
    return 'Invalid input';
  }

  return number.toFixed(decimalPlaces).replace(/\.?0+$/, '');
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export const formatNumber = (number: number | string = '0', infractionDigit: number = 2) => {
  let formatPrice = '';
  if (Number(number) > 0 && Number(number) < 0.01) {
    formatPrice = '< 0.01';
  } else if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else {
    formatPrice = roundDownToDecimals(number, infractionDigit).toLocaleString('en-US') as any;
  }
  return formatPrice;
};

export const formatDecimalNumber = (number: number | string, decimal: number = DEFAULT_DECIMALS) => {
  return Number(number) / Math.pow(10, decimal);
};

export const formatSmallNumber = (number: number | string = '0', infractionDigit: number = 2) => {
  let formatPrice = '';
  if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else {
    formatPrice = formatDecimal(number, infractionDigit).toLocaleString('en-US') as any;
  }
  return formatPrice;
};

export const formatPercentNumber = (number: number | string = '0', infractionDigit: number = 1) => {
  let formatPrice = '';
  if (Number(number) === 0) {
    formatPrice = '0';
  } else if (isNaN(Number(number))) {
    formatPrice = '0';
  } else {
    formatPrice = roundDownToDecimals(number, infractionDigit).toLocaleString('en-US') as any;
  }
  return formatPrice;
};

export const formatNumberBalance = (number: number | string = '0', infractionDigit: number = 4) => {
  let formatPrice = '';
  if (Number(number) > 0 && Number(number) < 0.0001) {
    formatPrice = '<0.0001';
  } else if (Number(number) > 0 && Number(number) < 0.01) {
    formatPrice = '<0.01';
  } else if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else if (Number(number) < 0.000001) {
    formatPrice = '< 0.0001';
  } else {
    if (Number.isInteger(Number(number))) {
      formatPrice = Number(Number(number)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatPrice;
    }
    const indexOf = String(number).indexOf('.') || -1;
    const newNumber = Number(String(number).slice(0, indexOf + infractionDigit + 1));
    formatPrice = Number(Number(newNumber)).toLocaleString('en-US', {
      minimumFractionDigits: infractionDigit,
      maximumFractionDigits: infractionDigit,
    });
  }
  return formatPrice;
};

export const formatRewardBalance = (number: number | string = '0', infractionDigit: number = 2) => {
  let formatPrice = '';
  if (Number(number) > 0 && Number(number) < 0.0001) {
    formatPrice = '<0.0001';
  } else if (Number(number) === 0) {
    formatPrice = '0.00';
  } else if (isNaN(Number(number))) {
    formatPrice = '0.00';
  } else if (Number(number) < 0.000001) {
    formatPrice = '< 0.0001';
  } else {
    if (Number.isInteger(Number(number))) {
      formatPrice = Number(Number(number)).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatPrice;
    }
    const indexOf = String(number).indexOf('.') || -1;
    const newNumber = Number(String(number).slice(0, indexOf + infractionDigit + 1));
    formatPrice = Number(Number(newNumber)).toLocaleString('en-US', {
      minimumFractionDigits: infractionDigit,
      maximumFractionDigits: infractionDigit,
    });
  }
  return formatPrice;
};

export const getDiff = (withdrawTime: any) => {
  return moment(parseInt(withdrawTime)).diff(Date.now());
};

export const copyToClipboard = (text: string) => {
  const textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

export const formatOnchainError = (error: any) => {
  const errorFormatted: any = serializeError(error);
  return {
    ...errorFormatted,
    message:
      errorFormatted?.data?.originalError?.reason ??
      errorFormatted?.data?.originalError?.shortMessage ??
      error.message,
  };
};