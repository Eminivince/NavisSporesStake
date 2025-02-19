"use client";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { formatNumber } from "@/utils";
import { useChainId, useToken } from "wagmi";
import { STAKED_TOKEN } from "@/common/configs";
import { useStakingInfo } from "@/common/hooks/use-staking";
import dynamic from "next/dynamic";
import { formattingUtils } from "@/utils/format.utils";
const StakingPoolTabContent = dynamic(
  () => import("@/views/staking/StakingPoolTab/StakingPoolTabContent"),
  {
    ssr: false,
  }
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Home() {
  const chainId = useChainId();
  const { data: stakeToken } = useToken({
    address: STAKED_TOKEN,
    chainId,
  });
  const { poolDetails, refetch } = useStakingInfo();
  const totalStaked = poolDetails
    ?.filter((e: any) => e.chainId === chainId)
    .reduce((acc: any, cur: any) => acc + Number(cur.stakedTotal), 0);
  const totalReward = poolDetails
    ?.filter((e: any) => e.chainId === chainId)
    .reduce((acc: any, cur: any) => acc + Number(cur.totalReward), 0);
  return (
    <section className={" relative pt-8 mt-20 pb-[200px] sm:pb-[240px]"}>
      <div
        className={
          "container flex flex-col mx-auto max-w-[1440px] md:mt-0 px-3 gap-6"
        }
      >
        <div className={"flex flex-col items-center gap-4 mt-10"}>
          <div className={"text-title text-5xl font-medium"}>Staking</div>
          <div className={" text-base text-center"}>
            Stake, Earn, and Grow with blockchain.
          </div>
        </div>

        <div
          className={"flex flex-col md:flex-row md:items-center gap-6 sm:mt-6"}
        >
          <div
            className={
              "relative w-full h-[129px] rounded-[16px] flex items-center gap-4 p-6 sm:px-10 sm:py-6 overflow-hidden"
            }
          >
            <Image
              src={require("@/common/assets/images/staking/new-banner.png")}
              alt={""}
              fill
              // className="hidden sm:block"
            />{" "}
            {/* <Image
              src={require("@/common/assets/images/staking/new-banner-mobile.svg")}
              alt={""}
              fill
              className="block sm:hidden"
            />{" "} */}
            <div className=" text-white w-full z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-base ">
                <span className="">NAVIX</span>
                <span className="">|</span>
                <span className="">Staking</span>
              </div>

              <h1 className="text-[#35D0FF] text-2xl font-bold">
                APR UP TO 60%
              </h1>

              <p className="text-sml text-gray-200">
                The first step of NAVIX 2.0
              </p>
            </div>
            <div className={"flex items-end gap-10"}></div>
          </div>

          <div
            className={
              "w-full sm:h-[129px] flex flex-col sm:flex-row sm:items-center rounded-[16px] bg-white"
            }
          >
            <div
              className={
                "w-full flex flex-col text-[#717681] gap-4 p-4 sm:p-8 justify-center items-center"
              }
            >
              <div>NAVIX Staked</div>
              <div>
                <div
                  className={"text-black text-2xl font-semibold leading-[125%]"}
                >
                  {formattingUtils.toLocalString(totalStaked, 5)} NAVIX
                </div>
              </div>
            </div>
            <div className={"px-4 sm:px-0"}>
              <div
                className={
                  "w-full sm:w-[1px] h-[1px] sm:h-[40px] bg-[#15192533]"
                }
              ></div>
            </div>
            <div
              className={
                "w-full flex flex-col text-[#717681] gap-4 p-4 sm:p-8 justify-center items-center"
              }
            >
              <div>Staking Rewards</div>
              <div>
                <div
                  className={
                    "text-[#0B5CCA] text-2xl font-semibold leading-[125%]"
                  }
                >
                  {formattingUtils.toLocalString(totalReward, 5)} NAVIX
                </div>
              </div>
            </div>
          </div>
        </div>
        <StakingPoolTabContent poolDetails={poolDetails} updatePool={refetch} />
      </div>

      {/* <ModalStakingPools
        isModalOpen={!!showModalStaking}
        loading={loadingStaking}
        stakeInfo={stakeInfo as any}
        poolInfo={filterPoolInfo as any}
        userPoolInfo={[infoPool1, infoPool2, infoPool3] as any}
        validate={validate}
        amountStake={amountStake}
        amountUnStake={amountUnStake}
        handleStake={handleStake}
        handleUnStake={handleUnStake}
        handleClose={toggleShowModalStaking}
        stakeToken={stakeToken1!}
        stakedAmount={stakedAmount}
        balance={balance}
        balanceStaked={currentStakedAmount}
        setBalanceStaked={setBalanceStaked}
        timeExpired={timeExpired}
        isExpired={isExpired}
        setIsExpired={setIsExpired}
        setTimeExpired={setTimeExpired}
        setValidate={setValidate}
        setPoolSelected={setSelectedPoolInfo}
        onChangeAmountStake={onChangeAmountStake}
        onChangeAmountUnStake={onChangeAmountUnStake}
        selectedPool={selectedPool}
        setSelectedPool={setSelectedPool}
      />
      <ModalStaking
        amount={Number(amountStake)}
        status={stakeStatus}
        show={showStake}
        error={errorStake}
        toggle={toggleShowStake}
        setShow={setShowStake}
      />
      <ModalUnStaking
        unstakeInfo={unstakeInfo}
        isExpired={isExpired}
        timeExpired={timeExpired}
        status={unStakeStatus}
        show={showUnStake}
        error={errorUnStake}
        toggle={toggleShowUnStake}
        setIsConfirmUnstake={setIsConfirmUnstake}
        setShow={setShowUnStake}
        confirmUnstake={handleUnStakeConfirm}
      /> */}
    </section>
  );
}
export default Home;
