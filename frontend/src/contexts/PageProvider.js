import { useState, useEffect } from "react";

import { PageContext } from "./PageContext";

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState(0);

  return (
    <PageContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
