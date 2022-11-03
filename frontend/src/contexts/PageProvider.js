import { useState } from "react";

import { PageContext, Pages } from "./PageContext";

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState(Pages.HomePage);

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
