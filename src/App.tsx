// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ContentInput from "./components/ContentInput";
import ArticlePage from "./components/ArticlePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/content" element={<ContentInput />} />
        <Route path="/article" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
};

export default App;
