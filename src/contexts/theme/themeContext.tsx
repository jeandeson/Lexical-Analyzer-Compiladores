import React, { createContext, useState } from "react";

type Theme = {
  backgroundImg: string;
};

type PropsThemeContext = {
  state: Theme;
  setState: React.Dispatch<React.SetStateAction<Theme>>;
};

const defaultValue = {
  state: {
    backgroundImg: "https://wallpapercave.com/wp/wp5005049.jpg",
  },
  setState: () => {},
};

const ThemeContext = createContext<PropsThemeContext>(defaultValue);

const ThemeContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<Theme>(defaultValue.state);

  return (
    <ThemeContext.Provider value={{ state, setState }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };
export default ThemeContext;
