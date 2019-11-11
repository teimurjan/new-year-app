import React from "react";
import ReactDOM from "react-dom";
import Transition from "react-transition-group/Transition";
import classNames from "classnames";

import LoadingIcon from "./loading-icon";

import s from "./LoadingLayout.module.scss";

interface IProps {
  in: boolean;
}

export default ({ in: in_ }: IProps) => {
  const root = document.getElementById("popover-root");

  return root
    ? ReactDOM.createPortal(
        <Transition in={in_} timeout={300} unmountOnExit={true}>
          {status => (
            <div
              className={classNames(s.loadingLayout, {
                [s.active]: status === "entering" || status === "entered"
              })}
            >
              <LoadingIcon />
            </div>
          )}
        </Transition>,
        root
      )
    : null;
};
