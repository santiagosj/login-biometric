import React from 'react';
import NavBar from '../Molecules/NavBar/NavBar';
import MainContent from './MainContent';

const AppHolder: React.FC = () => {
    return (
        <>
            <NavBar />
            <MainContent />
        </>
    )
}

export default AppHolder;