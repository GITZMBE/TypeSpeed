import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePage, LoginPage, SignupPage, StatsPage, TypingPage, SettingsPage, LeaderboardPage } from "pages";
import ResultPage from "pages/ResultPage";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <ToastContainer position='top-center' theme='dark' autoClose={3000} />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='' element={<HomePage />} />
          <Route path='result' element={<ResultPage />} />
          <Route path='typing' element={<TypingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='stats' element={<StatsPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='leaderboard' element={<LeaderboardPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
