"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signMessage } from "@wagmi/core";
import { Drawer, Layout, Menu, notification } from "antd";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useClient,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { HotIcon, MenuMobileIcon, WalletIcon } from "../icon/common";
import { ellipseAddress } from "@/utils";
import { routes } from "@/common/configs/constants";
import { useParams } from "next/navigation";
import { CustomConnectButton } from "./custom-connect-button";

const { Header } = Layout;

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

const PageHeader: React.FunctionComponent = () => {
  const router = useRouter();
  const param = useParams();
  const { address } = useAccount();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { disconnect } = useDisconnect();
  function openNewTab(url: string) {
    window.open(url, "_blank");
  }
  const SideMenu = ({ currentPageName, onRouteSelected }: any) => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div className="w-full flex flex-col">
          {routes
            .filter((r) => r.path !== "*" && !r.hidden)
            .map(({ name, path, target, hot, comingSoon }, index) => {
              const isCurrent = currentPageName
                .toLowerCase()
                .includes(name.toLowerCase());
              return (
                <Link
                  href={!target ? `/${path}` : path}
                  target={target ? "_blank" : ""}
                  key={`${name}-${index}-${isCurrent}`}
                  onClick={() => {
                    if (comingSoon) {
                      notification.warning({ message: "Coming Soon!" });
                      return;
                    }
                    onRouteSelected();
                  }}
                  className={classNames(
                    "w-full font-semibold text-[#131316] relative py-4 dark:text-[#E8E8E8] menuItem",
                    {
                      "hip-btn-selected": isCurrent,

                      // hot: hot,
                    }
                  )}
                >
                  <div className={"relative w-fit"}>
                    {name}
                    <div
                      className={`absolute right-[-20px] top-[-16px] ${
                        !hot && "hidden"
                      }`}
                    >
                      <HotIcon />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  };

  const renderNavItems: any = () => {
    return routes.map(
      ({ name, path, hidden, type, target, comingSoon, hot }: any) => {
        if (path === "*" || hidden) return null;
        const currentPageName = router.asPath;
        const isCurrent = currentPageName
          .toLowerCase()
          .includes(path.toLowerCase());
        return (
          <Menu.Item className={``} key={name}>
            {(type === "Page" || !type) && (
              <a
                onClick={() => {
                  const myObject: any = {};
                  const dynamicKey = Object.keys(param)[0];
                  myObject[dynamicKey] = dynamicKey;
                  if (comingSoon) {
                    notification.warning({ message: "Coming Soon!" });
                    return;
                  }
                  if (target) {
                    openNewTab(path);
                  } else {
                    router.push({
                      pathname: `/${path}`,
                      // query: Object.keys(param).length > 0 ? param : undefined,
                    });
                  }
                }}
                target={target ? "_blank" : ""}
                className={`flex items-center w-full h-full text-base font-medium nav-link text-dark-100 px-2 hover:text-[#0B5CCA]
              
              `}
              >
                {name}
                {/*<div className={`absolute right-8 top-3 ${!hot && 'hidden'}`}>*/}
                {/*  <HotIcon />*/}
                {/*</div>*/}
              </a>
            )}
          </Menu.Item>
        );
      }
    );
  };

  const toggleModalConnect = () => {};

  const isBlockVPN = router.pathname.includes("/error");

  return (
    <Header
      className={`header z-20 w-full fixed flex items-center pb-0 h-[58px] sm:h-[80px] px-6 bg-white`}
    >
      <div className="mx-auto container max-w-[1440px] h-full w-full top-0 left-0 flex justify-between items-center relative">
        <div className={"left-0 top-0 flex items-center"}>
          <Link
            href={"/"}
            className={"flex gap-[10px] items-center"}
            target={"_blank"}
            aria-label={"Go to home"}
          >
            <Image
              className="block sm:hidden logo w-auto h-[24px]"
              src={require("@/common/assets/images/staking/logo.svg")}
              alt=""
            />
            <Image
              className="hidden sm:block logo w-auto h-[24px] sm:h-[32px]"
              src={require("@/common/assets/images/staking/logo.svg")}
              alt=""
            />
          </Link>
        </div>
        {!isBlockVPN && (
          <div className="grow items-center justify-start h-full hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <Menu
              mode="horizontal"
              theme="dark"
              className={
                "flex justify-center h-full min-w-[200px] w-full !bg-transparent"
              }
            >
              {renderNavItems()}
            </Menu>
          </div>
        )}
        <CustomConnectButton />
      </div>
      <div
        className={"ml-4 border rounded-full block md:hidden"}
        onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
      >
        <div className="block md:hidden">
          <MenuMobileIcon />
        </div>
        {/* <svg
          onClick={() => setIsSideMenuOpen(true)}
          className={`${!isSideMenuOpen ? "block" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 8H18M6 12H18M6 16H18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
        {/* <svg
          onClick={() => setIsSideMenuOpen(false)}
          className={`${isSideMenuOpen ? "block" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.758 17.2431L12.001 12.0001L17.244 17.2431M17.244 6.75708L12 12.0001L6.758 6.75708"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
      </div>

      <Drawer
        open={isSideMenuOpen}
        placement="right"
        closable={false}
        onClose={() => setIsSideMenuOpen(false)}
      >
        <SideMenu
          currentPageName={router.asPath}
          onRouteSelected={() => setIsSideMenuOpen(false)}
        />
      </Drawer>
    </Header>
  );
};
export default PageHeader;
