import InputCurrency from "@/common/components/InputCureency";
import { lockCooldownFormat } from "@/common/configs";
import { STATUS } from "@/common/configs/constants";
import { useModal } from "@/common/hooks/useModal";
import { IPool } from "@/types/pool";
import { formatNumber, formatOnchainError } from "@/utils";
import { Button, Steps } from "antd";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import moment from "moment/moment";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Address, erc20Abi } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useToken,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import ModalUnStaking from "./ModalUnStaking";
import stakingAbi from "@/common/configs/abis/staking-contract.json";
import { useContractDetail } from "@/common/hooks/use-contract-detail";
import dayjs from "dayjs";
import { formatDate, formattingUtils } from "@/utils/format.utils";
import { DurationApr } from "../StakingPoolTab/DurationApr";

interface Props {
  poolInfo: IPool;
  handleClose: () => void;
}

const UnStakingTab: React.FunctionComponent<Props> = ({
  poolInfo,
  handleClose,
}) => {
  const [validate, setValidate] = useState("");
  const poolDetail = poolInfo;
  const { address } = useAccount();
  const [loadingStaking, setLoadingStaking] = useState(false);
  const [unStakeStatus, setUnStakeStatus] = useState<STATUS>(STATUS.PENDING);
  const { data: hash, writeContractAsync } = useWriteContract();
  const { data: poolConfig, refetch: refetchPoolConfig } = useContractDetail(
    poolDetail?.contract_address as Address,
    poolDetail?.chainId
  );
  const { data: txHash } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  });
  const [unStakeAmount, setAmountUnStake] = useState<string>("");

  const { withdrawStarts, withdrawEnds } = poolConfig ?? {};
  const isStartWithdraw = dayjs.unix(withdrawStarts ?? 0).isBefore(dayjs());
  // const isStartWithdraw = true;
  const isEndWithdraw = dayjs.unix(withdrawStarts ?? 0).isBefore(dayjs());

  const {
    show: showUnStake,
    setShow: setShowUnStake,
    toggle: toggleShowUnStake,
  } = useModal();
  const [errorUnStake, setErrorUnStake] = useState("");

  const handleUnStakeConfirm = async () => {
    console.log("object");
    setLoadingStaking(true);
    setUnStakeStatus(STATUS.PENDING);
    setShowUnStake(true);
    try {
      const hash = await writeContractAsync({
        address: poolDetail.contract_address as Address,
        abi: stakingAbi,
        functionName: "withdraw",
        args: [formattingUtils.parseUnit(unStakeAmount)],
      });

      // const { hash, result } = await run(unstakePayload);
      // setUnstakeInfo({
      //   amount: Number(parentAmount),
      //   reward: 0,
      //   hash,
      // });
      setShowUnStake(true);
    } catch (e: any) {
      const formatError = formatOnchainError(e);
      setErrorUnStake(formatError.message);
      // setShowUnStake(false);
      setUnStakeStatus(STATUS.FAIL);

      console.log(e);
    } finally {
      setLoadingStaking(false);
    }
  };
  useEffect(() => {
    if (hash) {
      setUnStakeStatus(STATUS.SUCCESS);
      refetchPoolConfig();
    }
  }, [hash]);

  const { data: stakedToken } = useToken({
    address: poolDetail.token_address as Address,
    chainId: poolDetail.chainId,
  });
  const { data: userStakedBalance } = useReadContract({
    abi: stakingAbi,
    address: poolDetail.contract_address as Address,
    functionName: "stakeOf",
    args: [address as Address],
  });

  const onChangeAmountStake = (value: string) => {
    setValidate("");
    setAmountUnStake(value);
  };

  const validateAmountUnStake = () => {
    let isSuccess = false;
    if (!unStakeAmount || Number(unStakeAmount) === 0) {
      setValidate("Amount is required!");
      isSuccess = false;
    } else if (Number(unStakeAmount) > Number(unStakeAmount)) {
      setValidate("Insufficient balance!");
      isSuccess = false;
    } else {
      setValidate("");
      isSuccess = true;
    }
    return isSuccess;
  };
  const chainId = useChainId();

  const isNeedSwitch = chainId !== Number(poolDetail.chainId);
  const { switchChainAsync } = useSwitchChain();

  const handleUnStake = async (amount: any, pool: any) => {
    if (isNeedSwitch) {
      return await switchChainAsync({
        chainId: Number(poolInfo.chainId),
      });
    }
    if (!validateAmountUnStake()) return;
    if (!isEndWithdraw) {
      setUnStakeStatus(STATUS.WARNING);
    }
    setShowUnStake(true);
  };
  const [indexDuration, setIndexDuration] = useState(2);

  const aprs = poolDetail.est_apr;
  return (
    <div className={"flex flex-col gap-6"}>
      <div className={"flex flex-col text-base text-[#8E929B] gap-4"}>
        <div className={"flex justify-between items-center"}>
          <div>Duration (months)</div>
          <div>
            <DurationApr
              aprs={aprs}
              indexDuration={indexDuration}
              setIndexDuration={setIndexDuration}
            />
          </div>
        </div>
        <div className={"flex justify-between text-base"}>
          <div className={"text-[#8E929B] font-normal"}>APR</div>
          <div className={"apr-text font-bold"}>
            {aprs[indexDuration - 1]?.value}%
          </div>
        </div>
      </div>
      <div>
        <InputCurrency
          label={"Unstake amount"}
          subTitle={"Staked"}
          enableUseMax={true}
          balance={Number(userStakedBalance ?? 0) / Math.pow(10, 18)}
          token={stakedToken}
          amount={unStakeAmount}
          isAllowDecimal={true}
          maxDecimals={stakedToken?.decimals}
          handleChange={(value) => {
            setValidate("");
            onChangeAmountStake(value);
          }}
          loading={true}
        />
        <p className={"text-red-500 my-2"}>{validate}</p>
      </div>
      {!isStartWithdraw && !!userStakedBalance && (
        <p className={"text-red-500 my-2"}>
          You can’t unstake until {formatDate(withdrawStarts ?? 0)}
        </p>
      )}
      <Button
        disabled={
          (Number(userStakedBalance) === 0 && !isNeedSwitch) ||
          (!isStartWithdraw && !isNeedSwitch)
        }
        // loading={loading}
        onClick={() => handleUnStake(Number(unStakeAmount), poolInfo)}
        size="small"
        className="min-w-[156px] h-[52px] hover:bg-[#0B5CCA] disabled:bg-[#ccc] text-white dark:text-[#fff] bg-[#0B5CCA] border-none rounded-[8px] font-medium
         w-full text-base"
      >
        {isNeedSwitch ? "Switch network" : "UnStake"}
      </Button>
      <ModalUnStaking
        status={unStakeStatus}
        show={showUnStake}
        toggle={toggleShowUnStake}
        setShow={setShowUnStake}
        confirmUnstake={handleUnStakeConfirm}
        unstakeInfo={{
          amount: Number(unStakeAmount),
          reward: 0,
          hash,
        }}
        error={errorUnStake}
        isExpired={true}
        setIsConfirmUnstake={() => null}
        handleClose={handleClose}
      />
    </div>
  );
};

export default UnStakingTab;
