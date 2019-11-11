import React from "react";

import s from "./Container.module.scss";

export default ({ children }: { children: React.ReactNode }) => (
  <div className={s.container}>{children}</div>
);
