import { createContext, ReactNode, useState } from "react";

import Router from 'next/router'

import { api } from "../services/api";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredenctials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredenctials): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>();
  const isAuthenticated = !!user;

  async function signIn({email, password}: SignInCredenctials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles
      })

      Router.push('/dashboard');
    } catch (err) {
      console.log(err)
    }
  } 

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated,
        user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}