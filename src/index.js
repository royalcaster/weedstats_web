import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LastLocationProvider } from 'react-router-dom-last-location';

import './components/common/CustomScrollBar.css'

const router = createBrowserRouter([
  {
    path: "*",
    element: (<LastLocationProvider><App /></LastLocationProvider>)
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);

reportWebVitals();
