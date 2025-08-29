import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Component1 from "./components/component1.jsx";
import Component2 from "./components/component2.jsx";
import Component3 from "./components/component3.jsx";
import Component4 from "./components/component4.jsx";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { isAuth } = useSelector((store) => store.auth);
  return isAuth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ChakraProvider>
      <Component1 />
      <Routes>
        <Route
          path="/"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              Welcome to Quiz App
            </h2>
          }
        />
        <Route path="/login" element={<Component2 />} />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Component3 />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <Component4 />
            </PrivateRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;