import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login"
import Gallery from "./pages/Gallery"

  function PrivateRouter({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
  }
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" element={
            <PrivateRouter>
              <Gallery />
            </PrivateRouter>
          }
        />
      </Routes>
    </AuthProvider >
  );
}

export default App;
