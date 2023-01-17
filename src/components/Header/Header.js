import React, { useState } from "react";
import classes from './Header.module.css';
import Logo from '../../assets/images/logo1.svg'
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FaBars} from 'react-icons/fa';

const Header = () => {

    const navOptions = [
        {title: 'Home', url: '/home'},
        {title: 'Blockchain', url: '/blockchain'}
    ];

    const navigate = useNavigate();
    const [isNav, setIsNav] = useState(false);

    return(
        <div className={classes.headerAllWrapper}>
          <div className={classes.headerContainer}>
            <span className={classes.headerText} onClick={() => navigate('/')}>
                <img src={Logo} alt="Logo" className={classes.headerImg} />
            </span>
            <span className={classes.headerHamContainer} onClick={() => setIsNav(isNav => !isNav)}>
              <FaBars />
            </span>
          </div>
          
        </div>
        
    )
};

export default Header;