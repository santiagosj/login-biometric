import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserDataPage from '../../pages/UserData/UserDataPage';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ProtectedRoute from './ProtectedRoute';

const MainContent: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-info" Component={UserDataPage} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
        </Routes>
    );
}
export default MainContent;