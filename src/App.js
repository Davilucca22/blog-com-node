import React from "react";
import AppRouter from "./Routes.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './pages/global.css'

export default function App() {
  return (
    <div className="App">
      <AppRouter/>
      <ToastContainer/>
    </div>
  );
}
