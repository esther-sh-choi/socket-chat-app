import "./App.scss";

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./components/AuthenticationGuard";

import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import CallbackPage from "./pages/CallbackPage";
import NotFoundPage from "./pages/NotFoundPage";
import PageLoader from "./components/PageLoader";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
