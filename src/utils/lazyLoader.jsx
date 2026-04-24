import { lazy } from "react";

export const lazyLoad = (importFunc) => {
  return lazy(importFunc);
};