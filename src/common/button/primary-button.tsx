import Button from "antd/es/button/button";
import clsx from "clsx";
import React from "react";
import styled from "styled-components";
export enum ButtonStyles {
  PRIMARY = "primary",
  SUCCESS = "success",
  SECONDARY = "secondary",
}
interface IButton {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  children?: any;
  color?: ButtonStyles;
  loading?: boolean;
}

const colors = {
  [ButtonStyles.PRIMARY]: "#0047FF",
  [ButtonStyles.SUCCESS]: "#08AC85",
  [ButtonStyles.SECONDARY]: "#1B1D21",
};

const WrapButton = styled(Button)<{ color: ButtonStyles }>`
  &:hover,
  &:focus {
    background-color: ${({ color }) => `${colors[color]} !important;`}
    opacity: 0.9;
  }
  &:disabled {
    background-color: ${({ color }) => `${colors[color]} !important;`}
    color: #a9a9a9 !important; /* Light gray text for disabled state */
    cursor: not-allowed !important; /* Not-allowed cursor for disabled state */
    opacity: 0.6; /* Slight transparency for disabled state */
  }
`;

const style: any = {
  [ButtonStyles.PRIMARY]: "bg-blue-150 ",
  [ButtonStyles.SUCCESS]: "bg-green-100",
  [ButtonStyles.SECONDARY]: "bg-dark-100",
};

export const PrimaryButton = ({
  onClick,
  label,
  disabled = false,
  className = "",
  color = ButtonStyles.PRIMARY,
  children,
  loading = false,
}: IButton) => {
  return (
    <WrapButton
      className={clsx(
        "border-0 border-transparent h-10 w-full !text-white rounded-lg text-[14px] text-base",
        className,
        style[color]
      )}
      color={color}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {label} {children}
    </WrapButton>
  );
};
