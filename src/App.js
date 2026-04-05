import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import ImportsExportsPage from "./Imports-ExportsPage";
import React from "react";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    // <BrowserRouter basename="/upitrads">
    //     <BrowserRouter>
    //   <ScrollToTop />
    //   <Routes>
    //     <Route path="/" element={<HomePage />}/>
    //     <Route path="/imports-exports" element={<ImportsExportsPage />} />
    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter basename="/upitrads">
  <ScrollToTop />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/imports-exports" element={<ImportsExportsPage />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;