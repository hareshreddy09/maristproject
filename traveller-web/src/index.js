import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux';
import state from './state';
import Dashboard from './components/Dashboard';
import { ChakraProvider, theme } from '@chakra-ui/react'
import Registration from './components/Registration';
import Preference from './components/Preference';
import Settings from './components/Settings';
import Logout from './components/Logout';
import About from './components/About';
import Contact from './components/Contact';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={state}>
      <ChakraProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<App></App>}>
              <Route path='' element={<Login></Login>}></Route>
              <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='/register' element={<Registration></Registration>}></Route>
              <Route path='/preference' element={<Preference></Preference>}></Route>
              <Route path='/settings' element={<Settings></Settings>}></Route>
              <Route path='/logout' element={<Logout></Logout>}></Route>
              <Route path='/about' element={<About></About>}></Route>
              <Route path='/contact' element={<Contact></Contact>}></Route>
              <Route path='*' element={<Dashboard></Dashboard>}></Route>
            </Route>
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
