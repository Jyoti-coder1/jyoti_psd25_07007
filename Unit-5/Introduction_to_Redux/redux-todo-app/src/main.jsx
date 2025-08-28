import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { store } from "./redux/store.js"
import App from './App.jsx'
import { Provider } from "react-redux"
import { ChakraProvider } from "@chakra-ui/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
