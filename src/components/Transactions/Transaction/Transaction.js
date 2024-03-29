import React, { useState, useEffect } from "react";
import classes from './Transaction.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from 'ethers';
import moment from 'moment';
const Transaction = () => {

    const { tId } = useParams();


    const navigate = useNavigate();
    const [blockData, setblockData] = useState({});
    const [loading, setLoading] = useState(true);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           // tran: tId
           hash: tId
        })
    };

    const fetchData = () => {
        fetch('http://178.128.150.245:3002/txdetail', options)
        .then((response) => {
            
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if(data.message.status && data.message.tran !== null && data.message.tranr !== null) {
                console.log(data.message);
                setblockData(data.message);
                setLoading(false);
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
        <div className={classes.transactionDataWrapper}>
        <div className={classes.txnDataMainPWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
                <div className={classes.transactionMainDataContainer}>
                    <div className={classes.transactionDetailContainer}>
                        <span className={classes.transactionDetailText}>
                            Transaction Details
                        </span>
                    </div>
                    <div className={classes.txnDetailsContainer}>
                        <div className={classes.border} />
                        {/*<div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Date Time
                                    
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                
                                <div className={classes.txnDetailValueText}>
                                {moment.unix(blockData.tran.timestamp/1000).format("YYYY-MM-DD HH:mm:ss")} 
                                {moment.unix(blockData.tran.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
}
                                </div>
                            </div>
                        </div>*/}
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Transaction Hash
                                    
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                
                                <div className={classes.txnDetailValueText}>
                                    {blockData.tranr.transactionHash}
                                </div>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Status
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {
                                        blockData.tranr.status ?
                                        'Success'
                                        : 'Pending'
                                    }
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Block
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {blockData.tran.blockNumber}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    To
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {blockData.tran.to}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    From
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {blockData.tran.from}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                       {/*s<div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Drala Price
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {Number(blockData.block.gasPrice.hex)}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Transaction Fees
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {Number(blockData.tran.gasUsed.hex)}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />*/}
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Drala
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {ethers.utils.formatEther(blockData.tran.value.hex)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        </div>
    )
};

export default Transaction;