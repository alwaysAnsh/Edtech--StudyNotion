import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/pages/Home"
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";


function App() {
  return (
    
    <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col" >
      <Navbar/>
      <Routes>
        <Route path ="/" element = {<Home/>} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        <Route
          path="about"
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        /> 

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
          
      </Routes>
    </div>
  );
}

export default App;
