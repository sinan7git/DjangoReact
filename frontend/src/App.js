import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowBooks from './components/ShowBooks';
import Favorite from './components/Favorite';
import BookDetail from './components/BookDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useEffect, useState } from 'react';

export  const UserContext = React.createContext();

function App(props) {
  const [userData,setUserData] = useState({});


  useEffect(() =>{
    setUserData(JSON.parse(localStorage.getItem("user_data")));
  },[]);

  
  return (
    <BrowserRouter>
      <UserContext.Provider value={userData}>
          <Routes>
          <Route path="/" element={<ShowBooks />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/favorites/" element={<Favorite />} />
          <Route path="/auth/login/" element={<Login />} />
          <Route path="/auth/signup/" element={<Signup />} />
          </Routes>
          </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
