import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import WriteupsPage from "./pages/writeups/WriteupsPage";
import WriteupDetailPage from "./pages/writeups/WriteupDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background py-20 px-6 md:py-32">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writeups" element={<div className="max-w-[750px] mx-auto"><WriteupsPage /></div>} />
          <Route path="/writeups/:slug" element={<div className="max-w-[750px] mx-auto"><WriteupDetailPage /></div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

