import React from "react";

import classNames from "classnames";

import Button, { IProps } from "../button";

import { ReactComponent as Logo } from "./logo.svg";

import s from "./GoogleButton.module.scss";

export default ({ children, className = "", ...props }: IProps) => (
  <Button className={classNames(s.googleBtn, className)} {...props}>
    <span className={s.googleBtn__logo}>
      <Logo />
    </span>
    {children}
  </Button>
);
