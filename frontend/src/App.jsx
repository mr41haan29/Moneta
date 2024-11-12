import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../src/pages/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import SignUpPage from "../src/pages/SignUpPage.jsx";
import TransactionPage from "../src/pages/TransactionPage.jsx";
import NotFoundPage from "../src/pages/NotFoundPage.jsx";
import Header from "./components/ui/Header.jsx";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query.js";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;
  // const authUser = true;

  // console.log("loading: ", loading);
  // console.log("auth user resposnse: ", data);
  // console.log("error: ", error);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
