import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBarItem.scss"
/**
 * @param {object} page - Defines the name and path to pass int Link component
 * @returns Return a li JSX element with a Link implementation.
 */

interface NavBarItemTypeProps {
    page: {
        name: string;
        path: string;
    }
}

const NavBarItem: React.FC<NavBarItemTypeProps> = ({ page }) => {
    return (
        <li>
            {<Link to={page.path} className="nav-link">{page.name}</Link>}
        </li >
    )
}

export default NavBarItem;