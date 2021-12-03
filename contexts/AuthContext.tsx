import { createContext, ReactNode } from "react";

type SignInCredenctials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredenctials): Promise<void>;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({email, password}: SignInCredenctials) {
    console.log({email, password});
  }

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}