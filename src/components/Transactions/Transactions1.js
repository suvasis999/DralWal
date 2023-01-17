import React,  { useState, useEffect } from "react";
import classes from './Transactions1.module.css';
import { timeConvert } from "../../utils/timeconvert";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';

const Transactions = () => {

    const txnsDetails = [
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
    ];

    const [tranData, setTranData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [count, setCount] = useState(1);

    const handlePrev = () => {
        if(count > 1) {
            setCount(count => count -1 );
        }
    }

    const handleNext = () => {
        setCount(count => count + 1);
    }

    const fetchData = () => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                n: (25 * count),
                m: ((25* (count - 1)) + 1)
            })
        };
        setLoading(true);
        fetch('https://backv2.musascan.io/fetchtranrange', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const val = data.message;
            setTranData(val);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, [count]);

    return(
        <div className={classes.blockDataWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
                <>
                    <div className={classes.allBlocksDetailsContainer}>
                        <div className={classes.blocksTextContainer}>
                            <span className={classes.blockTextValue}>
                                Transactions
                            </span>
                        </div>
                        <div className={classes.tableContainer}>
                            <div className={classes.tableHeadingContainer}>
                                <span className={classes.majorDataText}>
                                    Txn Hash
                                </span>
                                <span className={classes.minorDataText}>
                                    Block
                                </span>
                                {/* <span className={classes.minorDataText}>
                                    Age
                                </span> */}
                                <span className={classes.majorDataText}>
                                    From
                                </span>
                                <span className={classes.majorDataText}>
                                    To
                                </span>
                                <span className={classes.minorDataText}>
                                    Value
                                </span>
                                <span className={classes.minorDataText}>
                                    Fee
                                </span>
                            </div>
                            {
                                tranData.map((data, ind) => {
                                    return(
                                            <div key={ind} className={classes.textDetailsContainer}>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/tx/${data.hash}`)}>
                                                {data.hash}
                                            </span>
                                            <span className={classes.minorDataText} onClick={() => navigate(`/blocks/${data.blockNumber}`)}>
                                                {data.blockNumber}
                                            </span>
                                            {/* <span className={classes.minorDataText}>
                                                {data.age}
                                            </span> */}
                                            <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.from}`)}>
                                                {data.from}
                                            </span>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.to}`)}>
                                                {data.to}
                                            </span>
                                            <span className={classes.minorDataText}>
                                            {ethers.utils.formatEther(data.value)}
                                            </span>
                                            <span className={classes.minorDataText}>
                                            {ethers.utils.formatEther(data.gasUsed)}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={classes.blocksPaginationContainer}>
                            <span className={classes.blocksPrevContainer} onClick={handlePrev}>
                                Prev
                            </span>
                            <span className={classes.blocksPrevContainerValue}>
                                {count}
                            </span>
                            <span className={classes.blocksPrevContainer} onClick={handleNext}>
                                Next
                            </span>
                        </div>
                    </div>
                </>
            }
        </div>
        
    )
};

export default Transactions;