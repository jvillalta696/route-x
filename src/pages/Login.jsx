import React, { useState , useEffect} from 'react';
import { useAuth,AuthContextProvider } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login,isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();    
    await login(email);    
  };
  console.log(isAuthenticated(),user)
  useEffect(() => {
    if (isAuthenticated()){
      navigate("/");
    }
  }, [navigate]);
  return (
    
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>        
        <button type="submit">Login</button>
      </form>
    
  );
};

export default Login;