import React, { Suspense } from "react";
import GlobalLoader from "./GlobalLoader";

const LazyWrapper = ({ children }) => {
  return (
    <Suspense fallback={<GlobalLoader />}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;