import { User } from '../model/user';
import { ReactElement, createContext, useContext, useState } from 'react';

interface AuthContextData {
  user: User | null; // Tipo de datos personalizado para el usuario
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Tipo de datos personalizado para el usuario

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
