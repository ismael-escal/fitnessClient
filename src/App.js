import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Workout from './pages/Workout';
import AddWorkout from './pages/AddWorkout';

import './App.css';

import { UserProvider } from './UserContext';

function App() {

    //Add a global user state
    const [user, setUser] = useState({
      id: null
    });

    const unsetUser = () => {
      localStorage.clear();
    }

    useEffect(() => {

      fetch(`https://fitness-tracker-ep6x.onrender.com/users/details`, {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`
        }
      })
      .then(res => res.json())
      .then(data => {
        //console.log(data)

        if (typeof data.user !== "undefined") {
  
          setUser({
            id: data.user._id
          });
  
        } else {
  
          setUser({
            id: null
          });
  
        }
  
      })
  
      }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/getMyWorkouts" element={<Workout/>} />
            <Route path="/addWorkout" element={<AddWorkout/>} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
