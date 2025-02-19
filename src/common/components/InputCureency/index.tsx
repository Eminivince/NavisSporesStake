import { useModal } from "@/common/hooks/useModal";
import { formatNumber, formatNumberBalance } from "@/utils";
import React, { useMemo } from "react";
import PositiveFloatNumInput from "../PositiveFloatNumInput";
import Image from "next/image";

interface InputProps {
  max?: number;
  min?: number;
  handleChange?: (value: string) => void;
  amount: string;
  token: any;
  balance: any;
  subTitle?: string;
  setShowTokens?: (value: boolean) => void;
  disabled?: boolean;
  isAllowDecimal?: boolean;
  isOnSelected?: boolean;
  setTokenSelected?: any;
  enableUseMax?: boolean;
  label?: string;
  hiddenBalance?: boolean;
  className?: string;
  maxDecimals?: number;
  loading?: boolean;
  enableBalance?: string;
}

const MIN_AMOUNT_DEFAULT = 0.15;

const InputCurrency: React.FunctionComponent<InputProps> = ({
  handleChange,
  amount,
  token,
  balance,
  subTitle,
  disabled = false,
  isAllowDecimal,
  isOnSelected = true,
  loading = false,
  enableUseMax,
  label,
  hiddenBalance = false,
  maxDecimals,
  className,
  max,
  enableBalance = "",
}) => {
  const { setShow: setShowModalTokens } = useModal();

  const useMaxBalance = () => {
    enableUseMax && !!handleChange && handleChange?.(String(MaxBalance));
  };

  const MaxBalance = useMemo(() => {
    const blBigIntUnit =
      balance * Math.pow(10, 8) - MIN_AMOUNT_DEFAULT * Math.pow(10, 8);
    if (token?.symbol === "APT" && balance > 0.15) {
      return (blBigIntUnit / Math.pow(10, 8)).toFixed(token.decimals);
    } else if (token?.symbol === "APT" && balance <= 0.15) {
      return 0;
    } else {
      return balance;
    }
  }, [balance, token]);

  const onChangeInput = (value: any) => {
    handleChange?.(value);
  };

  return (
    <div className={`${className} bg-grey-200 p-4 `}>
      {label && (
        <div className={"flex justify-between text-default mb-6"}>
          <div className={"text-base text-[#8E929B]"}>{label}</div>
          {!hiddenBalance && (
            <div className={"flex items-center justify-between"}>
              {loading ? (
                <span className="loader-spin"></span>
              ) : (
                <div className={"text-gray-400"}>
                  ${formatNumberBalance(Number(amount) * token?.price, 4)}
                </div>
              )}
              <div
                onClick={useMaxBalance}
                className={"text-base text-[#8E929B] cursor-pointer"}
              >
                {subTitle ? subTitle : "Balance"}: {""}
                <span className={""}>{`${formatNumber(balance, 2)}`}</span>
                <span className="ml-2 px-2 py-1 bg-[#ced9e8] text-[#0B5CCA] rounded-xl">Max</span>
              </div>

            </div>
          )}
          {enableBalance == "top" && (
            <div className="text-right pr-2 text-sm">
              <span className="cursor-pointer" onClick={useMaxBalance}>
                <span className="text-default">Max: </span>
                <span className="text-white">{`${formatNumber(
                  balance,
                  2
                )}`}</span>
              </span>
            </div>
          )}
        </div>
      )}
      <div className={"currency-input"}>
        <span className={"currency-input__from"}>
          <PositiveFloatNumInput
            max={max ?? 1000000000}
            placeholder={"0.00"}
            maxDecimals={maxDecimals}
            className={`w-full bg-transparent border-0 h-full font-medium pl-0 text-[24px] sm:text-[32px] text-black`}
            isAllowDecimal={isAllowDecimal}
            isDisabled={disabled}
            inputAmount={amount}
            onInputChange={onChangeInput}
            showCommas
          />
        </span>
        <div className="text-right pr-2 text-sm flex gap-2 bg-white p-2 rounded-full min-w-[35px] sm:min-w-[90px] justify-center items-center font-medium">
          <Image
            className=" logo w-auto h-[24px]"
            src={require("@/common/assets/images/staking/logo.svg")}
            alt=""
          />
          <span className="hidden sm:block">NAVIX</span>
        </div>
      </div>

      {enableBalance == "bottom" && (
        <div className="text-right pr-2 text-sm">
          <span className="cursor-pointer" onClick={useMaxBalance}>
            <span className="text-default">Max: </span>
            <span>{`${formatNumber(balance, 2)}`}</span>
          </span>
        </div>
      )}
    </div>
  );
};
export default InputCurrency;
