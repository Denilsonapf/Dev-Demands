import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";

export default function Router() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
