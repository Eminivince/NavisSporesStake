import { FailedIcon, PendingIcon, StakingWarningIcon, SuccessIcon } from '@/common/components/icon/common';
import { ellipseAddress, formatNumber } from '@/utils';
import { Button, Modal } from 'antd';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Props {
  type: string;
  iconTitle?: ReactNode;
  title?: string;
  desc: any;
  unstakeInfo?: any;
  isModalOpen: boolean;
  width?: number;
  handleClose?: () => void;
  setIsConfirmUnstake?: (val: boolean) => void;
  buttonTitle?: string;
  confirmAction?: () => void;
  confirmCallback?: () => void;
}

export enum TYPE {
  PENDING,
  SUCCESS,
  FAILED,
}

const ModalNotification: React.FunctionComponent<Props> = ({
  type,
  iconTitle,
  title,
  desc,
  unstakeInfo,
  isModalOpen,
  width,
  handleClose,
  setIsConfirmUnstake,
  buttonTitle,
  confirmAction,
  confirmCallback,
}) => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   renderer: 'svg',
  // };
  return (
    <Modal
      className={'modal-customize !text-black'}
      centered
      open={isModalOpen}
      footer={false}
      title={''}
      onCancel={handleClose}
      width={width ?? 376}
      closable={false}
    >
      <div className={'flex flex-col items-center gap-6'}>
        {type === 'PENDING' && <PendingIcon />}
        {type === 'SUCCESS' && <SuccessIcon />}
        {type === 'FAILED' && <FailedIcon />}
        {type === 'WARNING' && <StakingWarningIcon />}
        {type === 'CUSTOM' && iconTitle}
        <div className={'text-center'}>
          {title && <div className={'text-default text-2xl font-semibold leading-[130%]'}>{title}</div>}
          <div className={'text-[#89898B] dark:text-white text-center mt-6'}>{desc}</div>
        </div>
        {unstakeInfo && (
          <div className={'w-full flex flex-col gap-2 bg-grey-600 rounded-lg text-base p-4'}>
            <div className={'flex justify-between'}>
              <div className={'text-[#8E929B]'}>Unstaked</div>
              <div className={'text-black'}>{unstakeInfo?.amount} NAVIX</div>
            </div>
            <div className={'flex justify-between'}>
              <div className={'text-[#8E929B]'}>Claimed reward</div>
              <div className={'text-black'}>{formatNumber(unstakeInfo?.reward)} NAVIX</div>
            </div>
            <div className={'flex justify-between'}>
              <div className={'text-[#8E929B]'}>Transaction hash</div>
              <Link href={`https://bscscan.com/tx/${unstakeInfo?.hash}`} target="_blank">
                <div className={'text-[#0B5CCA]'}>{ellipseAddress(unstakeInfo?.hash, 5)}</div>
              </Link>
            </div>
          </div>
        )}
        {type !== 'PENDING' && type !== 'WARNING' && (
          <Button
            onClick={confirmAction ? confirmAction : handleClose}
            size="small"
            className={`${type == 'SUCCESS' ? 'default-button2 text-[#fff]' : 'default-button text-[#000]'} mb-2 min-w-[156px] h-[52px] disabled:bg-[#ccc] font-semibold w-full text-lg`}
          >
            {buttonTitle ? buttonTitle : type === 'SUCCESS' ? 'Done' : 'Dismiss'}
          </Button>
        )}
        {type === 'WARNING' && (
          <div className={'w-full flex justify-between gap-2'}>
            <Button
              onClick={() => {
                setIsConfirmUnstake ? setIsConfirmUnstake(true) : {};
                if (handleClose) {
                  handleClose();
                }
                confirmCallback ? confirmCallback() : {};
              }}
              size="small"
              className="default-button2 bg-[#34363F] w-full mb-2 min-w-[156px] h-[52px] text-[#fff] dark:text-[#fff] font-semibold text-base"
            >
              Confirm
            </Button>
            <Button
              onClick={handleClose}
              size="small"
              className="default-button2 w-full mb-2 min-w-[156px] h-[52px] text-[#fff] dark:text-[#fff] font-semibold text-base"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalNotification;
