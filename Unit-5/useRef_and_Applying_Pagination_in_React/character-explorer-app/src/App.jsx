import './App.css'
import { CharacterProvider } from './context/CharacterContext'
import Home from './pages/Home';

function App() {
  return (
    <CharacterProvider>
      <Home />
    </CharacterProvider>
  );
}

export default App;
