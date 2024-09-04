import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarProvider } from './context/NavbarContext';
import GradePage from './pages/GradePage';
import StudentGradesPage from './pages/StudentGradesPage';
import LogoutPage from './pages/LogoutPage';


// Mock authentication function
const isAuthenticated = () => localStorage.getItem('authToken') !== null;

// Private Route component
const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Public Route component
const PublicRoute = ({ children }) => {
    return !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;
};


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />

                    {/* Private Routes */}
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <NavbarProvider>
                                    <HomePage />
                                </NavbarProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <NavbarProvider>
                                    <DashboardPage />
                                </NavbarProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/grades"
                        element={
                            <PrivateRoute>
                                <NavbarProvider>
                                    <GradePage/>
                                </NavbarProvider>
                            </PrivateRoute>
                        }
                    />
                     <Route
                        path="/students-grades"
                        element={
                            <PrivateRoute>
                                <NavbarProvider>
                                    <StudentGradesPage/>
                                </NavbarProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/logout"
                        element={
                            <PrivateRoute>
                                <NavbarProvider>
                                    <LogoutPage/>
                                </NavbarProvider>
                            </PrivateRoute>
                        }
                    />

                    {/* Redirect to home page if no match.This is especially for start project npm start */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
