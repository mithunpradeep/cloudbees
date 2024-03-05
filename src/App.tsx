import React from 'react';
import './App.css';
import {Route, Routes} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import Users from "./components/pages/Users";
import UsersDetails from "./components/pages/UserDetails";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Users/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/details/:username" element={<UsersDetails/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
