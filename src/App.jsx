import React from "react";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import { useStore } from "./store/useStore";
import "./index.css";

function App() {
  const userProfile = useStore(state => state.userProfile);

  return (
    <>
      {!userProfile ? <LandingPage /> : <Dashboard />}
    </>
  );
}

export default App;
