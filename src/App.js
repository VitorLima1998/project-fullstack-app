import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Products } from './components/Products';
import { Auth } from './components/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path='/auth' element={<Auth onAuth={handleLogin} />} />
          <Route
            path='/products'
            element={loggedIn ? <Products /> : <Navigate to='/auth' />}
          />
          <Route path='/' element={<Navigate to='/auth' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
