import React, { HTMLProps, useMemo, HTMLAttributes } from "react";

import classNames from "classnames";

import s from "./Button.module.scss";
import { Link, LinkProps } from "react-router-dom";

interface ICommonProps {
  success?: boolean;
  info?: boolean;
  warning?: boolean;
  danger?: boolean;
  large?: boolean;
}

export interface IButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ICommonProps {}
export interface IAnchorProps
  extends HTMLProps<HTMLAnchorElement>,
    ICommonProps {}
export interface ILinkProps extends LinkProps, ICommonProps {}

export type IProps = IButtonProps | IAnchorProps | ILinkProps;

export default ({
  color,
  large = false,
  className = "",
  children,
  success,
  info,
  warning,
  danger,
  ...props
}: IProps) => {
  const memoizedClassName = useMemo(
    () =>
      classNames(
        s.btn,
        {
          [s.success]: success,
          [s.info]: info,
          [s.warning]: warning,
          [s.danger]: danger,
          [s.large]: large
        },
        className
      ),
    [success, info, warning, danger, className, large]
  );

  if ((props as IAnchorProps).href) {
    return (
      <a className={memoizedClassName} {...(props as IAnchorProps)}>
        {children}
      </a>
    );
  }

  if ((props as ILinkProps).to) {
    return (
      <Link className={memoizedClassName} {...(props as ILinkProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={memoizedClassName} {...(props as IButtonProps)}>
      {children}
    </button>
  );
};
