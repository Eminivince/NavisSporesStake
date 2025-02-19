import { useContractReads } from "wagmi";
import poolAbi from "@/common/configs/abis/staking-contract.json";
import { Address } from "viem";
import { useMemo } from "react";
export const useContractDetail = (
  contractAddress: Address,
  chainId: number
) => {
  const { data, isLoading, isError, refetch } = useContractReads({
    contracts: [
      {
        address: contractAddress,
        abi: poolAbi,
        functionName: "stakingEnds",
        chainId: chainId,
      },
      {
        address: contractAddress,
        abi: poolAbi,
        functionName: "stakingStarts",
        chainId: chainId,
      },
      {
        address: contractAddress,
        abi: poolAbi,
        functionName: "withdrawStarts",
        chainId: chainId,
      },
      {
        address: contractAddress,
        abi: poolAbi,
        functionName: "withdrawEnds",
        chainId: chainId,
      },
    ],
  });
  const formattedData = useMemo(
    () => ({
      stakingEnds: data?.[0]?.result ? Number(data[0].result) : undefined,
      stakingStarts: data?.[1]?.result ? Number(data[1].result) : undefined,
      withdrawStarts: data?.[2]?.result ? Number(data[2].result) : undefined,
      withdrawEnds: data?.[3]?.result ? Number(data[3].result) : undefined,
    }),
    [data]
  );
  return { data: formattedData, isLoading, isError, refetch };
};
