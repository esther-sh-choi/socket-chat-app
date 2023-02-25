import "./App.scss";

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./components/authentication-guard";

import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { CallbackPage } from "./pages/callback-page";
import { NotFoundPage } from "./pages/not-found-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/chat"
        element={<AuthenticationGuard component={ChatPage} />}
      />

      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
