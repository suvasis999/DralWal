import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './ContractDetails.module.css';

const ContractDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const [blockData, setblockData] = useState({});
    const [loading, setLoading] = useState(true);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contractad: id
        })
    };

    const fetchData = () => {
        fetch('https://back.musascan.io/contractde', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setblockData(data);
            setLoading(false);
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
        <div className={classes.contractDMainWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
            <div className={classes.blockDataMainContainer}>
                <div className={classes.blockNoContainer}>
                    <span className={classes.blockNoText}>
                        ContractDetails
                    </span>
                </div>
                <div className={classes.blockDetailsContainer}>
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Contract Address
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
                                Token Name
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.tokenname}
                            </span>
                        </div>
                    </div>                
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Decimal
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.decimal}
                            </span>
                        </div>
                    </div>                
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Token Supply
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.totalsupply}
                            </span>
                        </div>
                    </div>                
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Symbol
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.tokenSymbol}
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

export default ContractDetails;