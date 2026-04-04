import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppRouter from "./Routes.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './pages/global.css'
import { FeedProvider, FeedContext } from "./context/FeedContext";

function AppContent() {
  const { darkTheme } = useContext(FeedContext);

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);

  return (
    <div className="App">
      <AppRouter/>
      <ToastContainer/>
    </div>
  );
}

function Scroll(){
  const location = useLocation()

  useEffect(() => {
    if(location.hash){
      const el = document.querySelector(location.hash)
      if(el){
        el.scrollIntoView({behavior:"smooth"})
      }
    }
  },[location])

  return null

}

export default function App() {
  return (
    <FeedProvider>
      <Scroll/>
      <AppContent />
    </FeedProvider>
  );
}
