
import { DEFAULT_DECIMALS } from '@/common/configs';
import { formatNumber } from '@/utils';
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import StakingPoolDuration from './StakingPoolDuration';

const StakingPoolItem: React.FunctionComponent<{
  pools: any;
  token: any;
  setShowModalStaking: (value: any) => void;
}> = ({ pools, token, setShowModalStaking }) => {
  const [poolSelected, setPoolSelected] = useState<any>();

  const isClosed = moment(poolSelected?.close_at).diff(Date.now()) / (1000 * 60 * 60 * 24) < 0;

  return (
    <section>
      <div className={'flex flex-col sm:hidden gap-3 font-medium'}>
        <div className={'flex justify-between items-center mb-2'}>
          <div>
            <div className={'text-[#fff] text-base font-bold'}>{pools?.pool_name}</div>
            {/*<div className={'text-[#717681]'}>*/}
            {/*  Open for {Math.ceil(moment(item?.close_at).diff(Date.now()) / (1000 * 60 * 60 * 24))} days*/}
            {/*</div>*/}
          </div>
          <div className={'text-[#C7E153] text-base font-bold'}>{poolSelected?.est_apr[0].value}% APR</div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Staked amount</div>
          <div className={'text-[#fff] font-bold'}>
            {poolSelected?.stakedInfo?.stake_amount && poolSelected?.stakedInfo?.stake_amount != 0
              ? formatNumber(
                  (Number(poolSelected?.stakedInfo?.stake_amount) - Number(poolSelected?.stakedInfo?.claimed_amount)) /
                    Math.pow(10, DEFAULT_DECIMALS),
                )
              : 0}{' '}
            {token?.symbol}
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Staking cap</div>
          <div className={'text-[#fff] font-bold'}>
            {formatNumber(poolSelected?.staking_cap)} {token?.symbol}
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Duration</div>
          <StakingPoolDuration pools={pools} setPoolSelected={setPoolSelected} />
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Status</div>
          {/* <StatusColumn record={poolSelected} isMobile={true} /> */}

        </div>
        <Button
          className={`${isClosed && 'hidden'} h-[36px] hover:bg-[#fff800] disabled:bg-[#ccc] text-[#000] dark:text-[#000] bg-[#C2E23D] border-none rounded-[8px] font-semibold text-base mt-2`}
          type="primary"
          onClick={() => setShowModalStaking(true)}
        >
          {!isClosed ? 'Stake now' : 'Unstake'}
        </Button>
      </div>

      <Row className={'staking-pool-item hidden sm:flex h-[96px] bg-[#2A2B36] text-base text-[#fff]'}>
        <Col sm={4} className={'flex items-center font-bold px-4 py-6'}>
          <div>{pools?.pool_name}</div>
        </Col>
        <Col sm={2} className={'flex items-center text-center text-[#C7E153] text-xl font-bold px-4 py-6'}>
          <div>{poolSelected?.est_apr[0].value}%</div>
        </Col>
        <Col sm={5} className={'flex items-center px-4 py-6'}>
          <div>
            <StakingPoolDuration pools={pools} setPoolSelected={setPoolSelected} />
          </div>
        </Col>
        <Col sm={5} className={'flex items-center font-bold px-4 py-6'}>
          <div>
            {formatNumber(poolSelected?.staking_cap)} {token?.symbol}
          </div>
        </Col>
        <Col sm={4} className={'flex items-center font-bold px-4 py-6'}>
          <div>
            {poolSelected?.stakedInfo?.stake_amount && poolSelected?.stakedInfo?.stake_amount != 0
              ? (Number(poolSelected?.stakedInfo?.stake_amount) - Number(poolSelected?.stakedInfo?.claimed_amount)) /
                Math.pow(10, DEFAULT_DECIMALS)
              : 0}{' '}
            {token?.symbol}
          </div>
        </Col>
        <Col sm={4} className={'flex items-center px-4 py-6'}>
          <div>
            {/* <StatusColumn record={poolSelected} isMobile={false} /> */}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default StakingPoolItem;
