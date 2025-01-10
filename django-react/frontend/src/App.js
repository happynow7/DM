import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/UserPage/LoginPage';
import SignupPage from './components/UserPage/SignupPage';

function App() {
    return (
        <Router>
            <Suspense fallback={(<div>...</div>)}>
                <NavBar />
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
