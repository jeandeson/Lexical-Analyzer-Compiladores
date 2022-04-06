import * as React from "react";

import { ThemeContextProvider } from "./theme/themeContext";

const GlobalContext: React.FC = ({ children }) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

export default GlobalContext;
