import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import Prediction from "./pages/prediction/Prediction";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-pcos" element={<AboutPage/>} />
        <Route path="/prediction" element={<Prediction/>} />
      </Routes>
      <Footer/>
    </>
  );
}
