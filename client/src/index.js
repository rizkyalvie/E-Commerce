import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
      <Router>
      <App />
    </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);

