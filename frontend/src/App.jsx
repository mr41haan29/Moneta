import { Route, Routes } from "react-router-dom";

import HomePage from "../src/pages/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import SignUpPage from "../src/pages/SignUpPage.jsx";
import TransactionPage from "../src/pages/TransactionPage.jsx";
import NotFoundPage from "../src/pages/NotFoundPage.jsx";
import Header from "./components/ui/Header.jsx";

function App() {
  const authUser = true;

  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
