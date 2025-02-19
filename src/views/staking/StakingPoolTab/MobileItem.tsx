import { formattingUtils } from "@/utils/format.utils";
import { Button } from "antd";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { DurationApr } from "./DurationApr";

export const MobileItem = ({
  item,
  openConnectModal,
  setSelectedPool,
  setShowModalStaking,
  poolDetails,
  index,
}: any) => {
  const { address } = useAccount();
  const [indexDuration, setIndexDuration] = useState(2);
  const aprs = item.est_apr;
  return (
    <div
      key={item?.id}
      onClick={() => {
        if (!address && Number(item.id) !== 5) {
          if (openConnectModal) {
            openConnectModal();
          }
          return;
        }
        setSelectedPool(item);
        if (Number(item.id) !== 5) {
          setShowModalStaking(true);
        }
      }}
      className={"bg-white p-4 rounded-[16px]"}
    >
      <div className={"flex flex-col gap-3 font-medium"}>
        <div className={"flex justify-between items-center mb-2"}>
          <div>
            <div className={"text-black text-base font-bold"}>
              {item?.pool_name}
            </div>
          </div>
          {Number(item.id) !== 5 ? (
            <div className={"apr-text text-base font-bold"}>
              {item.est_apr[indexDuration -1]?.value}% APR
            </div>
          ) : (
            <div className="apr-text text-base font-bold">END</div>
          )}{" "}
        </div>
        <div className={"flex justify-between"}>
          <div className={"text-[#717681]"}>Staked amount</div>
          <div className={"text-black font-bold"}>
            {poolDetails &&
              formattingUtils.toLocalString(
                poolDetails[index]?.stakedTotal
              )}{" "}
            NAVIX{" "}
          </div>
        </div>
        <div className={"flex justify-between"}>
          <div className={"text-[#717681]"}>Staking cap</div>
          <div className={"text-black font-bold"}>{item.stakingCap ?? 'Unlimited'}</div>
        </div>
        <div className={"flex justify-between"}>
          <div className={"text-[#717681]"}>Duration (months)</div>
          <div className={"text-black font-bold"}>
            <DurationApr
              aprs={aprs}
              indexDuration={indexDuration}
              setIndexDuration={setIndexDuration}
            />
          </div>
        </div>
        <Button
          className={`h-[36px] hover:bg-[#0B5CCA] disabled:bg-[#ccc] text-white dark:text-black bg-[#0B5CCA] border-none rounded-[8px] font-medium mt-2`}
          type="primary"
          onClick={() => setShowModalStaking(true)}
          disabled={Number(item.id) === 5}
        >
          Stake now
        </Button>
        {/*<div className={'flex justify-between'}>*/}
        {/*  <div className={'text-[#717681]'}>Status</div>*/}
        {/*  <StatusColumn record={item} isMobile={true} />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
