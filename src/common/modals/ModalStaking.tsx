import React from "react";
import ModalNotification from "./ModalNotification";
import { STATUS } from "../configs/constants";

interface Props {
  amount: number;
  status: STATUS;
  show: boolean | undefined;
  txHash?: string;
  txVersion?: string;
  networkCfg?: any;
  error?: string;
  toggle: () => void;
  setShow: (show: boolean) => void;
  handleClose?: () => void;
}

const errorCase = {
  not_registered: "Campaign's user not found",
};

enum ERROR_TEXT {
  NOT_REGISTERED = "The wallet is not whitelisted!",
}

const ModalStaking: React.FunctionComponent<Props> = ({
  amount,
  status,
  show,
  error,
  toggle,
  setShow,
  handleClose,
}) => {
  if (status === STATUS.FAIL) {
    return (
      <ModalNotification
        type={"FAILED"}
        title={"Failed"}
        desc={
          error ||
          (error === errorCase.not_registered && ERROR_TEXT.NOT_REGISTERED) ||
          "Something went wrong"
        }
        isModalOpen={!!show}
        handleClose={() => setShow(false)}
      />
    );
  }
  if (status === STATUS.SUCCESS) {
    return (
      <ModalNotification
        width={448}
        type={"SUCCESS"}
        title={"Successfully"}
        desc={
          <div>
            You have successfully staked{" "}
            <span className={"text-[#0B5CCA]"}>{amount} NAVIX.</span>
          </div>
        }
        isModalOpen={!!show}
        handleClose={() => {
          if (handleClose) {
            toggle();
            return handleClose();
          }
          window.location.reload();
        }}
      />
    );
  }
  return (
    <ModalNotification
      type={"PENDING"}
      title={"Stake $NAVIX"}
      desc={"Please confirm this transaction in your wallet to stake $NAVIX"}
      isModalOpen={!!show}
      width={400}
    />
  );
};

export default ModalStaking;
