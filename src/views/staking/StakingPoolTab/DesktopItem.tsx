import { DotIcon } from "@/common/components/icon/common";
import { formatPercentNumber } from "@/utils";
import { formattingUtils } from "@/utils/format.utils";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { DurationApr } from "./DurationApr";
import Image from "next/image";
export const DesktopItem = ({
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
    <Row
      key={item?.id}
      className={
        "hidden sm:flex table-item cursor-pointer border-t-[1px] border-grey-200"
      }
      onClick={() => {
        if (!address) {
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
    >
      <Col sm={4}>
        <div className={"text-base"}>
          <div className={"text-title font-semibold"}>
            <div className="flex gap-2 items-center">
              <Image
                className="hidden sm:block logo w-auto h-[24px] sm:h-[32px]"
                src={require("@/common/assets/images/staking/logo.svg")}
                alt=""
              />
              <div>
                {item?.pool_name}
                <p className="text-[#707993] !text-sm">NAVIX</p>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col sm={2}>
        <div className={"apr-text"}>
          {Number(item.id) !== 5
            ? `${formatPercentNumber(item?.est_apr[indexDuration - 1]?.value)}%`
            : "END"}
        </div>
      </Col>
      <Col sm={5}>
        <div className={"text-base text-title font-medium"}>
          <DurationApr
            aprs={aprs}
            indexDuration={indexDuration}
            setIndexDuration={setIndexDuration}
          />
        </div>
      </Col>
      <Col sm={4}>
        <div className={"text-base text-title font-medium"}>
          {item.stakingCap ?? "Unlimited"}
        </div>
      </Col>
      <Col sm={5}>
        <div className={"text-base text-title font-medium"}>
          {" "}
          {poolDetails &&
            formattingUtils.toLocalString(poolDetails[index]?.stakedTotal)}{" "}
          NAVIX
        </div>
      </Col>
      <Col sm={4}>
        <StatusColumn record={item} isMobile={false} />
      </Col>
    </Row>
  );
};

const StatusColumn: React.FunctionComponent<{
  record: any;
  isMobile: boolean;
}> = ({ record, isMobile }) => {
  const isDisabled = Number(record.id) === 5;
  return (
    <div className={""}>
      <div className={"staking-pools-status"}>
        <div>
          <div className={"text-base text-[#717681]"}>
            <div
              className={`flex items-center gap-2 ${
                isMobile && "justify-end text-sm"
              }`}
            >
              <DotIcon fill={isDisabled ? "#FF5555" : "#00F562"} />
              <div className={"text-title font-bold"}>
                {isDisabled ? "Close" : "Open"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"staking-pools-actions"}>
        <Button
          className="default-button2 h-[40px] font-semibold flex gap-2 disabled:bg-gray-100 disabled:text-gray-500"
          type="primary"
          disabled={isDisabled}
        >
          Stake now
        </Button>
      </div>
    </div>
  );
};
