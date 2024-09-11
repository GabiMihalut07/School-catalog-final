import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/Logo.png';
import './LoginPage.css'; 
import { useNavigate } from 'react-router-dom';  

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://38.242.231.170:442/api/auth/register', {
        email,
        password,
      });

      if (response.status === 201) {
        toast.success('User registered successfully!');
      } else {
        toast.error(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };


  return (
    <div className="root-login d-flex justify-content-center align-items-center vh-100">
      <div className="container container-login">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="logo mb-4" />
          <h1 className="h3">Create Account</h1>
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
          <button onClick={handleRegister} className="btn btn-primary w-100 mb-3">
            Register
          </button>
          <div className="text-center">
            <p>or</p>
            <button onClick={handleNavigateToLogin} className="btn btn-secondary w-100">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
