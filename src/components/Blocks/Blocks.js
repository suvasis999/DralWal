import React,  { useState, useEffect } from "react";
import classes from './Blocks.module.css';
import { timeConvert } from "../../utils/timeconvert";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';

const Blocks = () => {

   

    const [blockData, setblockData] = useState([]);
    const [loading, setLoading] = useState(true);
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
        fetch('https://backv2.musascan.io/fetchblockrange', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const val = data.message;
            setblockData(val);
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
            <div className={classes.blockDMainWrapper}>
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
                                Blocks
                            </span>
                        </div>
                        <div className={classes.tableContainer}>
                            <div className={classes.tableHeadingContainer}>
                                <span className={classes.majorDataText}>
                                    Block
                                </span>
                                <span className={classes.minorDataText}>
                                    Age
                                </span>
                                <span className={classes.minorDataText}>
                                    Txn
                                </span>
                                <span className={classes.majorDataText}>
                                    Fee Recipient
                                </span>
                                <span className={classes.majorDataText}>
                                    Drala Used
                                </span>
                                <span className={classes.minorDataText}>
                                    Drala Limit
                                </span>
                                <span className={classes.minorDataText}>
                                    Difficulty
                                </span>
                            </div>
                            {
                                blockData.map((data, ind) => {
                                    return(
                                            <div key={ind} className={classes.textDetailsContainer}>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/blocks/${data.blockNumber}`)}>
                                                {data.blockNumber}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                {timeConvert(data.timestamp)}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                0   
                                            </span>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.miner}`)}>
                                                {data.miner}
                                            </span>

                                            <span className={classes.majorDataText}>
                                                {ethers.utils.formatEther(data.gasUsed)}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                {ethers.utils.formatEther(data.gasLimit)}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                {data.difficulty}
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
        </div>
        
    )
};

export default Blocks;