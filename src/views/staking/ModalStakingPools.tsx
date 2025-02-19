import { CloseIcon } from "@/common/components/icon/common";
import { Col, Modal, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import StakingTab from "./StakingTab";
import UnStakingTab from "./UnStakingTab";
import { ENV, envNane } from "@/common/configs";
import { IPool } from "@/types/pool";

interface Props {
  isModalOpen: boolean;
  loading: boolean;
  stakeInfo: any;
  poolInfo: any;
  validate: string;
  handleClose: () => void;
  selectedPool: any;
  setSelectedPool: (val: any) => void;
  updatePool: () => void;
}

const ModalStakingPools: React.FunctionComponent<Props> = ({
  isModalOpen,
  stakeInfo,
  poolInfo,
  handleClose,
  selectedPool,
  updatePool,
}) => {
  const [tabStaking, setTabStaking] = useState<string>("1");
  const [poolAddress, setPoolAdress] = useState<string>("");
  const [poolSelectedInfo, setPoolSelectedInfo] = useState<IPool>(selectedPool);
  const [stakeInfoOfPoolSelected, setStakeInfoOfPoolSelected] =
    useState<StakeInfo>();

  useEffect(() => {
    setPoolSelectedInfo(selectedPool);
  }, [selectedPool]);

  // useEffect(() => {
  //   if (poolAddress === poolInfo[0]?.contract_address) {
  //     setPoolSelectedInfo(
  //       poolInfo?.find(
  //         (pool: any) => pool.contract_address === poolInfo[0]?.contract_address
  //       )
  //     );
  //     setPoolSelected(
  //       poolInfo?.find(
  //         (pool: any) => pool.contract_address === poolInfo[0]?.contract_address
  //       )
  //     );
  //     setStakeInfoOfPoolSelected(stakeInfo?.stakePool91Info);
  //   } else {
  //     setPoolSelectedInfo(
  //       poolInfo?.find(
  //         (pool: any) =>
  //           pool.contract_address === selectedPool?.contract_address
  //       )
  //     );
  //     setPoolSelected(
  //       poolInfo?.find(
  //         (pool: any) =>
  //           pool.contract_address === selectedPool?.contract_address
  //       )
  //     );
  //     setStakeInfoOfPoolSelected(stakeInfo?.stakePool182Info);
  //   }
  // }, [poolInfo, poolAddress]);

  // useEffect(() => {
  //   if (
  //     (ENV == envNane.TESTNET && poolSelectedInfo?.id == "6") ||
  //     (ENV == envNane.MAINNET && poolSelectedInfo?.id == "2")
  //   ) {
  //     setUserPoolSelectedInfo(userPoolInfo[0]);
  //   } else if (
  //     (ENV == envNane.TESTNET && poolSelectedInfo?.id == "7") ||
  //     (ENV == envNane.MAINNET && poolSelectedInfo?.id == "3")
  //   ) {
  //     setUserPoolSelectedInfo(userPoolInfo[1]);
  //   } else if (
  //     (ENV == envNane.TESTNET && poolSelectedInfo?.id == "8") ||
  //     (ENV == envNane.MAINNET && poolSelectedInfo?.id == "5")
  //   ) {
  //     setUserPoolSelectedInfo(userPoolInfo[2]);
  //   }
  // }, [userPoolInfo, poolSelectedInfo]);

  const handleExit = () => {
    handleClose();
    setTabStaking("1");
  };

  return (
    <Modal
      className={"modal-customize p-5"}
      centered
      open={isModalOpen}
      footer={false}
      title={""}
      width={480}
      onCancel={handleExit}
      closable={false}
    >
      <Row gutter={[40, 0]}>
        <Col xs={24} className={"w-full"}>
          <div className={"flex justify-between items-center mb-6"}>
            <div className={"text-3xl font-semibold"}>Staking pools</div>
            <div
              onClick={handleExit}
              className={"bg-grey-200 rounded-full p-2 cursor-pointer"}
            >
              <CloseIcon />
            </div>
          </div>
          <div
            className={
              "flex items-center bg-grey-200 rounded-[12px] gap-1 p-1 mb-6"
            }
          >
            <div
              onClick={() => setTabStaking("1")}
              className={`w-full h-[36px] flex justify-center items-center rounded-[8px] cursor-pointer ${
                tabStaking == "1"
                  ? "bg-white text-black"
                  : "bg-transparent text-grey-400"
              }`}
            >
              Stake
            </div>
            <div
              onClick={() => setTabStaking("2")}
              className={`w-full h-[36px] flex justify-center items-center rounded-[8px] cursor-pointer ${
                tabStaking == "2"
                  ? "bg-[white] text-black"
                  : "bg-transparent text-grey-400"
              }`}
            >
              Unstake
            </div>
          </div>
          {tabStaking == "1" && poolSelectedInfo ? (
            <StakingTab
              poolInfo={poolSelectedInfo}
              updatePool={updatePool}
              handleClose={handleClose}
            />
          ) : (
            poolSelectedInfo && (
              <UnStakingTab
                poolInfo={poolSelectedInfo!}
                handleClose={handleClose}
              />
            )
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalStakingPools;
