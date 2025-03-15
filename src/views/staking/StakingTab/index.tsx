/* eslint-disable no-extra-boolean-cast */

import InputCurrency from "@/common/components/InputCureency";
import { AMOUNT_TOKEN_FOR_FREE_GAS, MAX_INT } from "@/common/configs";
import { useNotification } from "@/common/contexts/notification.context";
import { useContractDetail } from "@/common/hooks/use-contract-detail";
import { STATUS } from "@/types/comon";
import { IPool } from "@/types/pool";
import { formatNumber, formatOnchainError } from "@/utils";
import { formatDate, formattingUtils } from "@/utils/format.utils";
import { Button, Steps } from "antd";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Address, erc20Abi, formatEther } from "viem";
import {
  useAccount,
  useChainId,
  useClient,
  useReadContract,
  useSignMessage,
  useSwitchChain,
  useToken,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import stakingAbi from "@/common/configs/abis/staking-contract.json";
import dayjs from "dayjs";
import { DurationApr } from "../StakingPoolTab/DurationApr";
import ModalStaking from "@/common/modals/ModalStaking";
import { useModal } from "@/common/hooks/useModal";
interface Props {
  poolInfo: IPool;
  updatePool: () => void;
  handleClose: () => void;
}

const StakingTab: React.FunctionComponent<Props> = ({
  poolInfo,
  updatePool,
  handleClose,
}) => {
  const [validate, setValidate] = useState("");
  const chainId = useChainId();
  const [poolDetail, setPoolDetail] = useState(poolInfo);
  useEffect(() => {
    poolInfo && setPoolDetail(poolInfo);
  }, [poolInfo]);
  const { data: poolConfig, refetch: refetchPoolConfig } = useContractDetail(
    poolDetail?.contract_address as Address,
    poolDetail?.chainId
  );
  const { stakingStarts, stakingEnds } = poolConfig ?? {};
  const isStartStaking = dayjs
    .unix(poolConfig?.stakingStarts ?? 0)
    .isBefore(dayjs());

  const { data: stakedToken } = useToken({
    address: poolDetail?.token_address as Address,
    chainId: poolDetail.chainId,
  });
  const { address } = useAccount();
  const [amountStake, setAmountStake] = useState<string>("");
  const {
    show: showStake,
    setShow: setShowStake,
    toggle: toggleShowStake,
  } = useModal();

  const onChangeAmountStake = (value: string) => {
    setValidate("");
    setAmountStake(value);
  };

  const { data: hash, writeContractAsync } = useWriteContract();
  const { data: allowanceAmt, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: poolDetail.token_address as Address,
    functionName: "allowance",
    args: [address as Address, poolDetail.contract_address as Address],
  });
  const isNeedApprove = useMemo(() => {
    if (!amountStake) {
      return false;
    }
    return formattingUtils.parseUnit(amountStake) > (allowanceAmt ?? 0);
  }, [allowanceAmt, amountStake]);
  const { data: balanceToken = 0, refetch } = useReadContract({
    abi: erc20Abi,
    address: stakedToken?.address,
    functionName: "balanceOf",
    args: [address as Address],
  });
  const isNeedSwitch = chainId !== Number(poolDetail.chainId);
  const [loadingStaking, setLoadingStaking] = useState(false);
  const [stakeStatus, setStakeStatus] = useState<STATUS>(STATUS.PENDING);
  const { data: txReceipt } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  });
  const { data: txStakeReceipt } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  });
  useEffect(() => {
    if (txReceipt) {
      updatePool();
      refetchAllowance();
      refetch();
    }
  }, [txReceipt]);
  useEffect(() => {
    if (txStakeReceipt) {
      updatePool();
      refetchAllowance();
      refetch();
      setStakeStatus(STATUS.SUCCESS);
    }
  }, [txStakeReceipt]);
  const validateAmountStake = () => {
    let isSuccess = false;
    if (!amountStake || Number(amountStake) === 0) {
      setValidate("Amount is required!");
      isSuccess = false;
    } else if (Number(amountStake) > Number(balanceToken)) {
      setValidate("Insufficient balance!");
      isSuccess = false;
    } else if (Number(amountStake) < 1) {
      setValidate("You can only stake a minimum of 1 NAVIX");
      isSuccess = false;
    } else {
      setValidate("");
      isSuccess = true;
    }
    return isSuccess;
  };
  const [errorStake, setErrorStake] = useState("");
  const notification = useNotification();

  const stakeAction = async (pool: any) => {
    if (Number(amountStake) > Number(allowanceAmt)) {
      try {
        const res = await writeContractAsync({
          address: stakedToken?.address as Address,
          abi: erc20Abi,
          functionName: "approve",
          args: [poolDetail.contract_address as Address, BigInt(MAX_INT)],
        });
        if (res) {
          refetchAllowance();
          notification.success({
            message: "Approval Successful",
            description: "You can now proceed with staking.",
            duration: 4.5,
          });
        }
      } catch (error) {
        const formatError = formatOnchainError(error);
        notification.error({
          message: "Transaction Failed",
          description:
            formatError?.message || "An error occurred during the transaction",
          duration: 4.5,
        });
      }
    } else {
      try {
        setShowStake(true);
        const res = await writeContractAsync({
          address: poolDetail.contract_address as Address,
          abi: stakingAbi,
          functionName: "stake",
          args: [formattingUtils.parseUnit(amountStake)],
          chainId: client?.chain?.id ?? 1,
        });
        if (res) {
          // setAmountStake("");
          // updatePool()
        }
      } catch (error) {
        // setShowStake(false);
        setStakeStatus(STATUS.FAIL);
        const formatError = formatOnchainError(error);
        setErrorStake(formatError.message);
        // notification.error({
        //   message: "Transaction Failed",
        //   description:
        //     formatError?.message || "An error occurred during the transaction",
        //   duration: 4.5,
        // });
      }
    }
  };
  const client = useClient();
  const handleStake = async (pool: any) => {
    if (!validateAmountStake()) return;
    setLoadingStaking(true);
    setStakeStatus(STATUS.PENDING);
    // setShowStake(true);

    try {
      await stakeAction(pool);
    } catch (e: any) {
      // setStakeStatus(STATUS.FAIL);
      // setErrorStake(e.message);
      // console.log(e);
    } finally {
      setLoadingStaking(false);
      // setShowStake(false);
    }
  };

  const isFreeGas =
    BigInt((!!balanceToken as any) ? (balanceToken as any) : "0") >
    BigInt(AMOUNT_TOKEN_FOR_FREE_GAS);
  const { switchChainAsync } = useSwitchChain();
  const wrapHandleStake = async (poolInfo: any) => {
    if (isNeedSwitch) {
      return await switchChainAsync({
        chainId: Number(poolInfo.chainId),
      });
    }
    await handleStake(poolInfo);
  };
  const [indexDuration, setIndexDuration] = useState(2);
  const aprs = poolDetail.est_apr;
  return (
    <div className={"flex flex-col gap-6"}>
      <ModalStaking
        amount={Number(amountStake)}
        status={stakeStatus}
        show={showStake}
        error={errorStake}
        toggle={toggleShowStake}
        setShow={setShowStake}
        handleClose={() => {
          handleClose();
          setAmountStake("");
        }}
      />
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
          label={"Amount"}
          enableUseMax={true}
          balance={Number(balanceToken) / Math.pow(10, 18)}
          token={stakedToken}
          amount={amountStake}
          isAllowDecimal={true}
          maxDecimals={stakedToken?.decimals}
          handleChange={(value: any) => {
            setValidate("");
            onChangeAmountStake(value);
          }}
          loading={true}
        />
        <p className={"text-red-500 my-2"}>{validate}</p>
        {!isStartStaking && (
          <p className={"text-red-500 my-2"}>
            You can’t stake until {formatDate(stakingStarts ?? 0)}
          </p>
        )}
        {/* <Link
          href={
            "https://pancakeswap.finance/?outputCurrency=0x5eAc29aD69093281C6440E6ac196bE4AAB07c4dE"
          }
          target={"_blank"}
        >
          <div className={"text-base text-[#0B5CCA]"}>Get $NAVIX</div>
        </Link> */}
      </div>
      <Button
        disabled={
          (!amountStake && !isNeedSwitch) ||
          (!isStartStaking && !isNeedApprove && !isNeedSwitch)
        }
        onClick={() => wrapHandleStake(poolInfo)}
        loading={loadingStaking}
        size="small"
        className="min-w-[156px] h-[52px] hover:bg-[#0B5CCA] disabled:bg-[#ccc] text-white dark:text-[#fff] bg-[#0B5CCA] border-none rounded-[8px]
         w-full text-base">
        {isNeedSwitch
          ? "Switch network"
          : isNeedApprove
          ? "Approve"
          : "Stake now"}{" "}
      </Button>
    </div>
  );
};

export default StakingTab;
