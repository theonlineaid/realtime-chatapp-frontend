import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './contexts/AuthContext.tsx';

const router = createBrowserRouter([

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
    <Toaster />
  </React.StrictMode>,
)
