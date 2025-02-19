import { useChainId, useContractReads } from "wagmi";
import poolAbi from "@/common/configs/abis/staking-contract.json";
import { formattingUtils } from "@/utils/format.utils";

const listPoolsMain = [
  {
    id: "0",
    pool_name: "Pool 1",
    type: 2,
    start_at: "2024-04-14T14:00:00.000Z",
    close_at: "2024-06-25T14:00:00.000Z",
    est_apr: [
      {
        time: 1,
        value: 15,
      },
      {
        time: 2,
        value: 25,
      },
    ],
    token_address: "0xb84C75479bB9e7Cf635eBB216E13C159C2647444",
    status: 2,
    contract_address: "0x9e41B9Aae21fC08431Ca73e395DEee97597cA9e8",
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: "",
    chainId: 97,
  },
  {
    id: "1",
    pool_name: "Pool 2",
    type: 2,
    start_at: "2024-04-14T14:00:00.000Z",
    close_at: "2024-06-25T14:00:00.000Z",
    est_apr: [
      {
        time: 2,
        value: 20,
      },
      {
        time: 3,
        value: 40,
      },
    ],
    token_address: "0xb84C75479bB9e7Cf635eBB216E13C159C2647444",
    status: 2,
    contract_address: "0x039BD8e880A638f19EC3D9e629a13b5f79061731",
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: "",
    chainId: 97,
  },
  {
    id: "3",
    pool_name: "Mainnet Pool 1",
    type: 2,
    start_at: "2024-04-14T14:00:00.000Z",
    close_at: "2024-06-25T14:00:00.000Z",
    est_apr: [
      {
        time: 2,
        value: 25,
      },
      {
        time: 4,
        value: 45,
      },
    ],
    token_address: "0xF72148dc9dAdA4BbE10F338ee1449Ebab0EC777E",
    status: 2,
    contract_address: "0xDF45Cb9478B243d5250448CD283C1333CeEa7112",
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: "",
    chainId: 56,
    stakingCap: "3m",
  },
  {
    id: "4",
    pool_name: "Mainnet Pool 2",
    type: 2,
    start_at: "2024-04-14T14:00:00.000Z",
    close_at: "2024-06-25T14:00:00.000Z",
    est_apr: [
      {
        time: 3,
        value: 35,
      },
      {
        time: 6,
        value: 75,
      },
    ],
    token_address: "0xF72148dc9dAdA4BbE10F338ee1449Ebab0EC777E",
    status: 2,
    contract_address: "0xe117c49d60658674E83CeFA43f4a66ec80534cdc",
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: "",
    chainId: 56,
    stakingCap: "2m",
  },
  {
    id: "6",
    pool_name: "Mainnet Pool 3",
    type: 2,
    start_at: "2024-04-14T14:00:00.000Z",
    close_at: "2024-06-25T14:00:00.000Z",
    est_apr: [
      {
        time: 4,
        value: 45,
      },
      {
        time: 12,
        value: 95,
      },
    ],
    token_address: "0xF72148dc9dAdA4BbE10F338ee1449Ebab0EC777E",
    status: 2,
    contract_address: "0xF5FEDf051F1b8325Eb72763Be0a34025049f2dF5",
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: "",
    chainId: 56,
    stakingCap: "2m",
  },
];
const isProd = process.env.CURRENT_NETWORK === "PROD";
export const useStaking = () => {
  const chainId = useChainId();
  return {
    poolInfo: isProd
      ? listPoolsMain.filter((e) => e.chainId !== 97)
      : listPoolsMain,
  };
};
export const chunkData = (data: any[], chunkSize: number) => {
  const result = [];
  if (!data?.length || !chunkSize) {
    return [];
  }
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }
  return result;
};
export const useStakingInfo = () => {
  const chainId = useChainId();
  const pools = isProd
    ? listPoolsMain.filter((e) => e.chainId !== 97)
    : listPoolsMain;
  const calls: any = pools
    .map((e) => {
      return [
        {
          address: e.contract_address,
          abi: poolAbi,
          functionName: "stakedTotal",
          chainId: e.chainId,
        },
      ];
    })
    .concat(
      pools.map((e) => {
        return {
          address: e.contract_address,
          abi: poolAbi,
          functionName: "rewardsTotal",
          chainId: e.chainId,
        };
      })
    );
  const { data, isLoading, isError, refetch } = useContractReads({
    contracts: calls.flat() ?? ([] as any),
  });
  const chunkRes: any = data?.length && chunkData(data as any, pools.length);
  return {
    totalStaked:
      !!chunkRes &&
      chunkRes[0]?.reduce((acc: any, cur: any) => {
        if (cur.status === "success") {
          return acc + cur.result;
        }
      }, BigInt(0)),
    totalReward:
      !!chunkRes &&
      chunkRes[1]?.reduce((acc: any, cur: any) => {
        if (cur.status === "success") {
          return acc + cur.result;
        }
      }, BigInt(0)),
    isLoading,
    isError,
    refetch,
    poolDetails:
      chunkRes &&
      pools.map((e, index) => {
        return {
          contractAddress: e.contract_address,
          stakedTotal:
            chunkRes?.length &&
            formattingUtils.formatUnit(chunkRes[0][index].result),
          rewardsTotal:
            chunkRes?.length &&
            formattingUtils.formatUnit(chunkRes[1][index].result),
          chainId: e.chainId,
        };
      }),
  };
};
