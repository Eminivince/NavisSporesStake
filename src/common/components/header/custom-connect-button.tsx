import { PrimaryButton } from "@/common/button/primary-button";
import { formattingUtils } from "@/utils/format.utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRef } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { WalletIcon } from "../icon/common";
import { ellipseAddress } from "@/utils";
import { Button } from "antd";

export const CustomConnectButton = () => {
  const avatarRef = useRef(null);
  const { disconnectAsync } = useDisconnect();
  const { address } = useAccount();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        const element: any = avatarRef.current;
        if (element?.firstChild) {
          element?.removeChild(element?.firstChild);
        }

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <PrimaryButton
                    onClick={async () => {
                      await disconnectAsync();
                      openConnectModal();
                    }}
                    className="!h-10 px-4 !font-bold rounded-md"
                  >
                    Connect Wallet
                  </PrimaryButton>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} className="h-10 rounded-xl bg-red-400 text-white px-4 font-medium ">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="!text-xs h-10 !py-px sm:rounded-[10px] sm:px-3 rounded-full border-none  px-2 relative cursor-pointer flex justify-center items-center gap-2">
                  <div className="!bg-[#FFFFFF] opacity-5  absolute w-full h-full rounded-full " />

                  {/* <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}
                  <div
                    onClick={openAccountModal}
                    className="font-bold text-[16px] px-0 md:px-2 flex gap-2 justify-center items-center relative z-10"
                  >
                    <div
                      className={
                        "flex items-center rounded-full border border-[#33343E] bg-[#1C1D25] gap-2 p-2 cursor-pointer"
                      }
                    >
                      <WalletIcon />
                      <div
                        className={
                          "text-sm sm:text-base text-[#fff] font-medium uppercase"
                        }
                      >
                        {ellipseAddress(address, 5)}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                      >
                        <path
                          d="M1 0.499023L5 3.50098L9 0.499023"
                          stroke="white"
                          strokeOpacity="0.4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
