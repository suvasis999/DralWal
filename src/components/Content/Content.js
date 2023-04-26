import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './Content.module.css';
import './Style.css';
import logo1 from './logo1.svg';
import logo2 from './note.png';
import logo3 from "./feature-8.png";
import logo4 from "./dm.jpg";
import etherStatGraph from "./ether-st-graph.PNG";


const Content = () => {

    const [inputVal, setInputVal] = useState('');
    const [err,setErr]=useState('');
    const inputPlaceHolder = "Search by Address/Txn Hash";

    const navigate = useNavigate();
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(inputVal);
        
        /*if(/^\d+$/.test(inputVal)){
            setErr('');
            navigate(`/blocks/${inputVal}`);
        } else*/ if(inputVal.length == 66) {
            setErr('');
            navigate(`/tx/${inputVal}`);
        } else if(inputVal.length == 42) {
            setErr('');
            navigate(`/address/${inputVal}`);
        }
        else{
            setErr('Invalid Address/Txn Hash')
        }
        setInputVal('');
        
    }

    return(
        <div className={classes.contentContainer}>
            <div className={classes.contentHeadingContainer}>
                <span className={classes.contentHeadingText}>
                    The Drala Block Explorer
                </span>
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.inputFieldContainer}>
                    <input 
                        className={classes.inputField}
                        placeholder={inputPlaceHolder} 
                        type="text" 
                        value={inputVal} 
                        onChange={(e) => setInputVal(e.target.value)}
                     />
                </span>
                <span className={classes.inputSearchText} onClick={(e) => handleSearch(e)}>
                    Search
                </span>
                <div className={classes.errText}>{err} </div>
            </div>
            <section className='price-stats'>
                <div className='left-stats'>
                <div  className={classes.trans_card}>
                    <div className='submain-1'>
                    <div>
                        <img src={logo1} className="iconsDrala" />
                    </div>
                    <div>
                        <p className="para">
                        <span className='spn-p'>Drala Price</span> <br/>
                            $1,179.70<span className='spn'>   </span>
                        </p>
                    </div>
                    </div>
                    <div className='submain-1'>
                    <div>
                        <img src={logo2} className="icons" />
                    </div>
                    <div>
                        <p className="para">
                        <span className='spn-p'>Transactions</span> <br/>
                        $1,179.70 <span className='spn'>   </span>
                        </p>
                    </div>
                    </div>
                    {/*<div className='submain-1'>
                    <div>
                        <img src={logo3} className="icons" />
                    </div>
                    <div>
                        <p className="para">
                        <span className='spn-p'>Market Cap</span> <br/>
                            $1,179.70 <span className='spn'>   </span>
                        </p>
                    </div>
    </div>*/}
                     {/*<div className='submain-1'>
                    <div>
                        <img src={logo4} className="icons" />
                    </div>
                   <div>
                        <p className="para">
                            <span className='spn-p'>Last Finalized</span> <br/>
                            $1,179.70<span className='spn'> @ 0.070688 BTC (-2.01%) </span>
                        </p>
    </div>
                    </div>*/}
                    <div className='submain2'>
                    </div>
                </div>
                </div>
                {/*<div className='right-stats'>
                <div>
                    <img src={etherStatGraph} style={{height:"150px", width:"100%"}} />
                </div>
                </div>*/}
            </section>
        </div>
    )
};

export default Content;