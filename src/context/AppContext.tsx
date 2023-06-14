import { ReactElement, createContext, useState } from "react";

export type LikedContextType = [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>];
export type SavedContextType = [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>];

export const AppContext = createContext<{ likedContext: LikedContextType, savedContext: SavedContextType }>({
  likedContext: [[], () => {}],
  savedContext: [[], () => {}]
});

export const AppProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [liked, setLiked] = useState<boolean[]>([]);
  const [saved, setSaved] = useState<boolean[]>([]);

  return (
    <AppContext.Provider value={{ likedContext: [liked, setLiked], savedContext: [saved, setSaved] }}>
      {children}
    </AppContext.Provider>
  );
};
