import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  
import logo from '../assets/Logo.png';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:442/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        toast.success('Login successful!');
        // Redirect to the home or dashboard page after successful login
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  // Function to navigate to the register page
  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="root-login d-flex justify-content-center align-items-center vh-100">
      <div className="container container-login">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="logo mb-4" />
          <h1 className="h3">Catalog ITPB</h1>
        </div>
        <div className="login-div">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={handleLogin} className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <div className="text-center">
            <p>or</p>
            <button onClick={handleNavigateToRegister} className="btn btn-secondary w-100">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
