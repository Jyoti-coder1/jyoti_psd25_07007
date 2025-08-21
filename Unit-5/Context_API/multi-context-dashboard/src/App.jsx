import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <div className="app">
                    <Navbar />
                    <div className="content">
                        <Sidebar />
                        <MainContent />
                    </div>
                    <Footer />
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;