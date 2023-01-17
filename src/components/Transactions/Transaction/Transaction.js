import React, { useState, useEffect } from "react";
import classes from './Transaction.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from 'ethers';

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
            tran: tId
        })
    };

    const fetchData = () => {
        fetch('https://back.musascan.io/txdetal', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.status && data.tran !== null && data.block !== null) {
                setblockData(data);
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
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Transaction Hash
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {blockData.tran.transactionHash}
                                </span>
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
                                        blockData.tran.status ?
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
                        <div className={classes.txnDataContainer}>
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
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Value
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {Number(blockData.block.value.hex)}
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