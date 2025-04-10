import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/header/index.jsx';
import Footer from '../components/footer/index.jsx';
import Home from '../pages/home/index.jsx';
import About from '../pages/about/index.jsx';
import Admin from '../components/admin/index.jsx';

const Routing = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
  
    return (
      <>
        {!isAdmin && <Header />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {!isAdmin && <Footer />} 
      </>
    );
  };
  
  export default Routing;
  