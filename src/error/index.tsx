import React from "react";

import classNames from "classnames";

import s from "./Error.module.scss";

export default ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={classNames(s.error, className)}>{children}</div>;
