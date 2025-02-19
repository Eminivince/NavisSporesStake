import { forwardRef, useImperativeHandle, useRef } from 'react';
import { NumericFormat } from 'react-number-format';

type PositiveFloatNumInputProps = {
  inputAmount?: string;
  className?: string;
  isDisabled?: boolean;
  isAllowDecimal?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  maxDecimals?: number;
  onInputChange?: (e: any) => void;
  onAmountChange?: (a: number) => void;
  prefix?: string;
  suffix?: string;
  label?: string;
  showCommas?: boolean;
};

// const MIN_DEFAULT = 0.00000001;
const MAX_DEFAULT = Number.MAX_SAFE_INTEGER;
const MAX_DECIMALS_DEFAULT = 9;

// eslint-disable-next-line react/display-name
const PositiveFloatNumInput = forwardRef<HTMLInputElement, PositiveFloatNumInputProps>(
  (
    {
      inputAmount,
      isDisabled = false,
      isAllowDecimal,
      label = '',
      // min = MIN_DEFAULT,
      max = MAX_DEFAULT,
      maxDecimals = isAllowDecimal ? MAX_DECIMALS_DEFAULT : 0,
      onInputChange = () => {},
      className,
      placeholder = '0.0000',
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);
    // const format = (numStr: any) => {
    //   if (numStr === '') return '';
    //   return new Intl.NumberFormat('en-US', {
    //     maximumFractionDigits: 0,
    //   }).format(numStr);
    // };
    return (
      <NumericFormat
        className={`${className} input-format focus-visible:outline-0`}
        aria-label={label}
        value={inputAmount}
        displayType="input"
        decimalScale={maxDecimals}
        placeholder={placeholder}
        thousandsGroupStyle="thousand"
        thousandSeparator=","
        decimalSeparator={'.'}
        allowNegative={false}
        isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === '' || Number(floatValue) <= max;
        }}
        onValueChange={(values: any) => {
          if (values.floatValue > max) {
            onInputChange(max);
          } else {
            onInputChange(values.floatValue);
          }
        }}
        disabled={isDisabled}
      />
    );
  },
);

export default PositiveFloatNumInput;
