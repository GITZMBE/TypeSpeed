import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import TypePage from "./pages/TypingPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className='App w-full h-screen bg-primary flex flex-col items-center px-4 sm:px-12'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='' element={<HomePage />} />
          <Route path='stats' element={<StatsPage />} />
          <Route path='typing' element={<TypePage />} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
