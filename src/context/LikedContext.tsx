import { ReactElement, createContext, useState } from "react";

export type LikedContextType = [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>];

export const LikedContext = createContext<LikedContextType>([[], () => {}]);

export const LikedProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [liked, setLiked] = useState<boolean[]>([]);

  return (
    <LikedContext.Provider value={[liked, setLiked]}>
      {children}
    </LikedContext.Provider>
  );
};
