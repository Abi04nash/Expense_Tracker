import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import "./App.css";
import First from "./components/first";
import Expense from "./components/Expense";
import Contact from "./components/Contact";
import Nav from "./components/Nav";
import Footer from "./components/Footer";




function AnimatedRoutes() {
  const location = useLocation(); // Get current route

  return (
    <div key={location.pathname} className="page">
       <Routes>
        <Route path="/" element={<First />} />
        <Route path="/first" element={<First />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </div>
  );
}





function App() {
  

  return (
    <HashRouter>
      <Nav />
      <AnimatedRoutes />
      <Footer /> 
    </HashRouter>
  )
}

export default App
