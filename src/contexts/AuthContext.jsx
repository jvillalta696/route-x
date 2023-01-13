import React, { createContext, useState, useEffect } from "react";
import { client } from "../backend/supabase/client";
const supabase = client;

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = async (email) => {
    const data = await supabase.auth.signInWithOtp({ email });
    console.log(data);
  };

  const login = async (email) => {
   const data = await supabase.auth.signInWithOtp({ email });   
   console.log(data)
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    
      const data = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {setUser(session.user);console.log(session)}
        if (event ==='SIGNED_OUT') {setUser({name:'hola'})}
        console.log(event,user)
      })
      //console.log('Hi', data)
    
   
  }, [user]);

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
