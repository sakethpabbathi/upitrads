import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import ImportsExportsPage from "./ImportsExportsPage";
import PrivacyPolicy from "./PrivacyPolicy";
import React from "react";
import ScrollToTop from "./ScrollToTop";
import Terms from "./Terms";

function App() {
  return (

    <BrowserRouter basename="/upitrads">
  <ScrollToTop />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/imports-exports" element={<ImportsExportsPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;