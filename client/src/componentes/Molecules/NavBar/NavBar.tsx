import React from 'react';
// import { useNavigate } from 'react-router-dom';
import NavBarItem from './NavBarItem/NavBarItem';
import { useAuth } from '../../../hooks/useAuth';
import "./NavBar.scss"
const NavBar: React.FC = () => {

    const { isAuth } = useAuth();

    const navigationItems = {
        itemsAuth: [
            { name: 'Home', path: '/home' },
            { name: 'User', path: '/user-info' },
            { name: 'Device', path: '/user-device' }
        ],
        itemsNoAuth: [
            { name: 'Login', path: '/login' },
            { name: 'Sign up', path: '/sign-up' },
        ]
    }

    return (
        <nav className='navbar'>
            {isAuth ?
                navigationItems.itemsAuth.map((item, i) => <NavBarItem key={i} page={item} />) :
                navigationItems.itemsNoAuth.map((item, i) => <NavBarItem key={i} page={item} />)
            }
        </nav>
    )
}

export default NavBar;