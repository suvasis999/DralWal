import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { timeConvert } from "../../../utils/timeconvert";
import classes from './Block.module.css';
import { ethers } from 'ethers';
import moment from 'moment';
const Block = () => {

    const { id } = useParams();
    
    const navigate = useNavigate();
    const [blockData, setblockData] = useState({});
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num: Number(id)
        })
    };

    const fetchData = () => {
        fetch('https://back.musascan.io/blockdetailnum', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.status) {
                setblockData(data.hash);
                setLoading(false);
                setErr(false);
            }
            else{
                setErr(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className={classes.blockDataWrapper}>
            {
                loading ?
                <div className={classes.blockMainParentWrapper}>
                    <div className={classes.blockDataMainContainer}>
                        <div className={classes.blockNoContainer}>
                        <div className={classes.loadingText}>
                            
                            {err==true?
                            'Data not Found':'Loading...'}
                        </div>
                        </div>
                    </div>
                </div>
               
                :
                <div className={classes.blockMainParentWrapper}>
                    <div className={classes.blockDataMainContainer}>
                        <div className={classes.blockNoContainer}>
                            <span className={classes.blockNoText}>
                                Block {"  "}
                            </span>
                            <span className={classes.blockNoValue}>
                                #{id}
                            </span>
                        </div>
                        <div className={classes.blockDetailsContainer}>
                            <div className={classes.border} />
                            <div className={classes.blockDataContainer}>
                                <div className={classes.blockDetailKeyContainer}>
                                    <span className={classes.blockDetailKeyText}>
                                        Block Number
                                    </span>
                                </div>
                                <div className={classes.blockDetailValueContainer}>
                                    <span className={classes.blockDetailValueText}>
                                        {id}
                                    </span>
                                </div>
                            </div>              
                            <div className={classes.border} />
                            <div className={classes.blockDataContainer}>
                                <div className={classes.blockDetailKeyContainer}>
                                    <span className={classes.blockDetailKeyText}>
                                        Date Time
                                    </span>
                                </div>
                                <div className={classes.blockDetailValueContainer}>
                                    <span className={classes.blockDetailValueText}>
                                    {moment(blockData.timestamp * 1000).utc().format("YYYY-MM-DD HH:mm:ss")} UTC
                                        
                                    </span>
                                </div>
                            </div>                
                            <div className={classes.border} />
                            <div className={classes.blockDataContainer}>
                                <div className={classes.blockDetailKeyContainer}>
                                    <span className={classes.blockDetailKeyText}>
                                    Transactions
                                    </span>
                                </div>
                                <div className={classes.blockDetailValueContainer}>
                                    {
                                        blockData.transactions.length == 0 ?
                                        <span className={classes.blockDetailValueText}>
                                            <span>{blockData.transactions.length}</span> transactions in this block
                                        </span>
                                        :
                                        <span className={classes.blockDetailValueText}>
                                            <span onClick={() => navigate(`/blocks/address/${id}`)}>{blockData.transactions.length}</span> transactions in this block
                                        </span>
                                    }

                                </div>
                            </div>                
                            <div className={classes.border} />
                           {/* <div className={classes.blockDataContainer}>
                                <div className={classes.blockDetailKeyContainer}>
                                    <span className={classes.blockDetailKeyText}>
                                    Fee recipient
                                    </span>
                                </div>
                                <div className={classes.blockDetailValueContainer}>
                                    <span className={classes.blockDetailValueText} onClick={() => navigate(`/address/${blockData.miner}`)}>
                                    {blockData.miner}
                                    </span>
                                </div>
                            </div>               
                            <div className={classes.border} />*/} 
                            <div className={classes.blockDataContainer}>
                                <div className={classes.blockDetailKeyContainer}>
                                    <span className={classes.blockDetailKeyText}>
                                        Total Difficulty
                                    </span>
                                </div>
                                <div className={classes.blockDetailValueContainer}>
                                    <span className={classes.blockDetailValueText}>
                                        {blockData.difficulty}
                                    </span>
                                </div>
                            </div>                            
                            <div className={classes.border} />
                           {/* <div className={classes.blockDataContainer}>
                                <div className={classes.blockDetailKeyContainer}>
                                    <span className={classes.blockDetailKeyText}>
                                        Drala Used
                                    </span>
                                </div>
                                <div className={classes.blockDetailValueContainer}>
                                    <span className={classes.blockDetailValueText}>
                                    {ethers.utils.formatEther(Number(blockData.gasUsed.hex))}
                                    </span>
                                </div>
                            </div>                
                            <div className={classes.border} />
                            <div className={classes.blockDataContainer}>
                                <div className={classes.blockDetailKeyContainer}>
                                    <span className={classes.blockDetailKeyText}>
                                        Drala Limit
                                    </span>
                                </div>
                                <div className={classes.blockDetailValueContainer}>
                                    <span className={classes.blockDetailValueText}>
                                    {ethers.utils.formatEther(Number(blockData.gasLimit.hex))}                                    </span>
                                </div>
                        </div>*/}
                            
                        </div>
                    </div>
            </div>
            }
        </div>
    )
};

export default Block;