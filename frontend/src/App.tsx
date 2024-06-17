import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import TypePage from "./pages/TypingPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App w-full h-screen bg-primary flex flex-col items-center px-4 sm:px-12'>
      <BrowserRouter>
        <Header />
        <ToastContainer position='top-center' theme='dark' autoClose={3000} />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='' element={<HomePage />} />
          <Route path='stats' element={<StatsPage />} />
          <Route path='typing' element={<TypePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
