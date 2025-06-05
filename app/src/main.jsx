import { createRoot } from 'react-dom/client';
import * as ReactRouterDom from "react-router-dom";
const { BrowserRouter } = ReactRouterDom;
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);