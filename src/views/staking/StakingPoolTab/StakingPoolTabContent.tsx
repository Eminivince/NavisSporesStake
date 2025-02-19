"use client";
import { useStaking } from "@/common/hooks/use-staking";
import { useModal } from "@/common/hooks/useModal";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button, Col, Row, Table } from "antd";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import ModalStakingPools from "../ModalStakingPools";
import { MobileItem } from "./MobileItem";
import { DesktopItem } from "./DesktopItem";

const StakingPoolTabContent: React.FunctionComponent<{
  poolDetails: any;
  updatePool: () => void;
}> = ({ poolDetails, updatePool }: any) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { poolInfo } = useStaking();
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const {
    show: showModalStaking,
    setShow: setShowModalStaking,
    toggle: toggleShowModalStaking,
  } = useModal();
  const {
    show: showStake,
    setShow: setShowStake,
    toggle: toggleShowStake,
  } = useModal();
  const [loadingStaking, setLoadingStaking] = useState(false);
  const [validate, setValidate] = useState("");
  const stakeInfo = {};
  return (
    <div className={"staking-tabs mt-4"}>
      <ModalStakingPools
        isModalOpen={!!showModalStaking}
        loading={loadingStaking}
        stakeInfo={stakeInfo as any}
        poolInfo={selectedPool as any}
        validate={validate}
        selectedPool={selectedPool}
        setSelectedPool={setSelectedPool}
        handleClose={toggleShowModalStaking}
        updatePool={updatePool}
      />
      <p className="text-xl font-semibold mb-3">Pools</p>
      <div className={"flex flex-col sm:hidden gap-6"}>
        {poolInfo?.map((item: any, index: number) => (
          <div key={`mobile-${item.id}`}>
            <MobileItem
              item={item}
              openConnectModal={openConnectModal}
              setSelectedPool={setSelectedPool}
              setShowModalStaking={setShowModalStaking}
              poolDetails={poolDetails}
              index={index}
            />
          </div>
        ))}
      </div>
      <Row className={"hidden sm:flex table-header bg-[#FFFFFF]"}>
        <Col sm={4}>Pool</Col>
        <Col sm={2}>APR</Col>
        <Col sm={5}>Duration (months)</Col>
        <Col sm={4}>Staking cap</Col>
        <Col sm={5}>Staked amount</Col>
        <Col sm={4}></Col>
      </Row>
      {poolInfo?.map((item: any, index: number) => (
        <div key={`desktop-${item.id}`}>
          <DesktopItem
          item={item}
          openConnectModal={openConnectModal}
          setSelectedPool={setSelectedPool}
          setShowModalStaking={setShowModalStaking}
          poolDetails={poolDetails}
          index={index}
        />
        </div>
      ))}
    </div>
  );
};

export default StakingPoolTabContent;
