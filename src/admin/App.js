import React from 'react' // import React, { Component } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Stories } from './pages'

const App = () => {
    return (
        <div>
            <HashRouter>
                <Routes>
                    {/* <Route exact path="/login" name="Login Page" element={<Login />} />
                    <Route exact path="/register" name="Register Page" element={<Register />} />
                    <Route exact path="/404" name="Page 404" element={<Page404 />} />
                    <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
                    <Route exact path="*#dash" name="Home" element={<Dashboard />} />
                    <Route exact path="*#list" name="List" element={<Stories />} />
                    <Route path="*" name="Home" element={<Dashboard />} />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App