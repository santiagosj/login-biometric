import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserDataPage from '../../pages/UserData/UserDataPage';
import Devices from '../../pages/Devices/Devices';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ProtectedRoute from './ProtectedRoute';

const MainContent: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-info" Component={UserDataPage} />
                <Route path="/user-device" Component={Devices} />
                <Route path="/home" Component={Home} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
        </Routes>
    );
}
export default MainContent;