import React, { HTMLProps } from "react";
import classNames from "classnames";

import s from "./Form.module.scss";

export const Form: React.FC<
  HTMLProps<HTMLFormElement> & { inline?: boolean }
> = ({ children, className, inline, ...props }) => (
  <form
    className={classNames(s.form, className, { [s.formInline]: inline })}
    {...props}
  >
    {children}
  </form>
);

export const FormField: React.FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={classNames(s.formField, className)} {...props}>
    {children}
  </div>
);

export const FormLabel: React.FC<HTMLProps<HTMLLabelElement>> = ({
  className,
  children,
  ...props
}) => (
  <label className={classNames(s.formLabel, className)} {...props}>
    {children}
  </label>
);

export const FormInput: React.FC<HTMLProps<HTMLInputElement>> = ({
  className,
  ...props
}) => <input className={classNames(s.formInput, className)} {...props} />;

export const FormError: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={classNames(s.formError, className)} {...props}>
    {children}
  </div>
);
