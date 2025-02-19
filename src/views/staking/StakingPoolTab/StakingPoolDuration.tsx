import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Props {
  pools: any;
  setPoolSelected: (value: any) => void;
}

const StakingPoolDuration: React.FunctionComponent<Props> = ({ pools, setPoolSelected }) => {
  const childPools: any[] = pools?.items;
  const [poolAddress, setPoolAddress] = useState<string>(childPools[0]?.contract_address);

  useEffect(() => {
    setPoolSelected(childPools?.find((pool) => pool.contract_address == poolAddress));
  }, [poolAddress]);

  return (
    <div className={'flex items-center gap-2'}>
      {childPools?.map((pool: any, index) => {
        return (
          <div
            key={pool?.id}
            onClick={(e) => {
              setPoolAddress(pool?.contract_address);
              e.stopPropagation();
            }}
            className={classNames(
              'relative flex justify-center items-center w-[54px] h-[36px] bg-[#393C46] border border-[#393C46] rounded-[8px] text-[#fff] text-base font-semibold cursor-pointer',
              {
                'border border-[#C2E23D]': poolAddress === pool?.contract_address,
              },
            )}
          >
            {pool?.est_apr[0]?.time}
            <Image
              src={require('@/common/assets/images/staking/selected-pool-icon.png')}
              alt={''}
              className={`${poolAddress == pool?.contract_address ? 'block' : 'hidden'} absolute w-[16px] h-[16px] top-[-1px] right-0 rounded-tr-[4px]`}
            />
          </div>
        );
      })}
    </div>
    // <div className={'text-base text-[#fff] font-semibold'}>{record?.est_apr[0]?.time} days</div>
  );
};

export default StakingPoolDuration;
