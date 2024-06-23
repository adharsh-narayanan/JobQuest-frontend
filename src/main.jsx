import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import ContextAPi from './context/contextApi.jsx'
import store from './redux/store/store.js';
import { Provider } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ContextAPi>
<ToastContainer theme='colored' position='top-center' autoClose={2000} />
  
     <BrowserRouter><Provider store={store}> <App /></Provider></BrowserRouter>
     
</ContextAPi>
  </React.StrictMode>,
)
