import './App.css'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home';

function App() {
  return (
    <AppProvider>
      <div className='app'>
        <Home />
      </div>
    </AppProvider>
  );
}

export default App
