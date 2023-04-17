import React from "react";
import classes from './Footer.module.css';
import Logo from '../../assets/images/logo1.svg';
import { FaTelegram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return(
        <div className={classes.footerContainer}>
            <div className={classes.footerMainTextContainer}>
               {/* <div className={classes.footerMainDataContainer}>
                    <div className={classes.footerMainDataHeadingContainer}>
                        <span className={classes.footerMainDataHeadingText}>
                            Explore
                        </span>
                    </div>
                    
                    <div className={classes.footerMainDataValuesContainer}>
                        <span className={classes.footerMainDataValuesText}>
                             Transactions
                        </span>
                    </div>
                </div>*/}
               
                <div className={classes.footerMainDataContainer}>
                    <div className={classes.footerMainDataHeadingContainer}>
                        <span className={classes.footerMainDataHeadingText}>
                            About
                        </span>
                    </div>
                    <div className={classes.footerMainDataValuesContainer}>
                        <span className={classes.footerMainDataValuesText}>
                            <a href="https://www.drala.io "  className={classes.footerAText} target='_blank'>
                                Drala
                            </a>
                        </span>
                    </div>
                    
                    <div className={classes.footerMainDataValuesContainer}>
                        <span className={classes.footerMainDataValuesText}>
                            Email
                        </span>
                    </div>
                </div>
                <div className={classes.footerMainDataContainer}>
                   
                   
                </div>
                
            </div>
            <hr className={classes.whiteColor} />
            <div className={classes.footerNameLogoContainer}>
                <div className={classes.footerNameContainer}>
                    <span className={classes.footerMainExplorerText}>
                        <img src={Logo} alt="Logo" className={classes.footerImg} />
                    </span>                
                </div>
                <div className={classes.footerLogoContainer}>
                    
                </div>
            </div>
        </div>
    )
};

export default Footer;