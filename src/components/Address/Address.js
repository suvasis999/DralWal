import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { timeConvert } from "../../utils/timeconvert";
import classes from './Address.module.css';
import { ethers } from 'ethers';

const Address = () => {

    const { addressId } = useParams();

    const [addressData, setAddressData] = useState();
    const [loading, setLoading] = useState(true);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "address": addressId,
            "m": 1,
            "n": 1000
        })
    };

    const navigate = useNavigate();

    const fetchData = () => {
        fetch('http://178.128.150.245:3002/fetchaddress', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setAddressData(data.message)
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const toPlainString=(num)=> {
        return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
          function(a,b,c,d,e) {
            return e < 0
              ? b + '0.' + Array(1-e-c.length).join(0) + c + d
              : b + c + d + Array(e-d.length+1).join(0);
          });
      }
      

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className={classes.addressDataWrapper}>
        <div className={classes.addParentWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
        <div className={classes.addMainDetailsContainer}>
            <div className={classes.addressNoContainer}>
                <span className={classes.addNoText}>
                    Address Details
                </span>
            </div>
            {/* <div className={classes.overviewAddContainer}>
                <span className={classes.overviewAddText}>
                    Overview of Address:
                </span>
            </div>
            
            <div className={classes.overviewDetailsContainer}>
                <span className={classes.overviewDetailKeyText}>
                    Transaction Count - 
                </span>
                <span>
                    {addressData}
                </span>
            </div> */}

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
                                    Drala
                                </span>
                                <span className={classes.minorDataText}>
                                    Fee
                                </span>
                            </div>
                            {
                                addressData.map((data, ind) => {
                                    return(
                                            <div key={ind} className={classes.textDetailsContainer}>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/tx/${data.hash}`)}>
                                                {data.hash}
                                            </span>
                                            <span className={classes.minorDataText} onClick={() =>console.log('') /*navigate(`/blocks/${data.blockNumber}`)*/}>
                                                {data.blockNumber}
                                            </span>
                                            {/* <span className={classes.minorDataText}>
                                                {timeConvert(Number(data.timestamp))}
                                            </span> */}
                                            <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.from}`)}>
                                                {data.from}
                                            </span>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.to}`)}>
                                                {data.to}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                {ethers.utils.formatEther(toPlainString(data.value))}
                                                {/*ethers.utils.formatEther(data.value)*/}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                {data.gasUsed}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
        </div>
        }
        </div>
        </div>
    )
};

export default Address;