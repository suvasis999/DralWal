import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import classes from './BlockTransactions.module.css';

const BlockTransactions = () => {

    const { blockNo } = useParams();
    const txnData = [
        {txnHash: '0x776a1a1c14375913e14b2500913cc92b4eef51dd6dcc615e6ceba829cec927a2', blockNo: '101010', age: '14 secs ago', from: '0x05dbc384a27cf826874d588154dfcafa747cfdaa', to: '0x05dbc384a27cf826874d588154dfcafa747cfda8', value: '101 MUSA', txnFee: '1MUSA'},
        {txnHash: '0x776a1a1c14375913e14b2500913cc92b4eef51dd6dcc615e6ceba829cec927a2', blockNo: '101010', age: '14 secs ago', from: '0x05dbc384a27cf826874d588154dfcafa747cfdaa', to: '0x05dbc384a27cf826874d588154dfcafa747cfda8', value: '101 MUSA', txnFee: '1MUSA'},
        {txnHash: '0x776a1a1c14375913e14b2500913cc92b4eef51dd6dcc615e6ceba829cec927a2', blockNo: '101010', age: '14 secs ago', from: '0x05dbc384a27cf826874d588154dfcafa747cfdaa', to: '0x05dbc384a27cf826874d588154dfcafa747cfda8', value: '101 MUSA', txnFee: '1MUSA'},
        {txnHash: '0x776a1a1c14375913e14b2500913cc92b4eef51dd6dcc615e6ceba829cec927a2', blockNo: '101010', age: '14 secs ago', from: '0x05dbc384a27cf826874d588154dfcafa747cfdaa', to: '0x05dbc384a27cf826874d588154dfcafa747cfda8', value: '101 MUSA', txnFee: '1MUSA'},
        {txnHash: '0x776a1a1c14375913e14b2500913cc92b4eef51dd6dcc615e6ceba829cec927a2', blockNo: '101010', age: '14 secs ago', from: '0x05dbc384a27cf826874d588154dfcafa747cfdaa', to: '0x05dbc384a27cf826874d588154dfcafa747cfda8', value: '101 MUSA', txnFee: '1MUSA'},
        {txnHash: '0x776a1a1c14375913e14b2500913cc92b4eef51dd6dcc615e6ceba829cec927a2', blockNo: '101010', age: '14 secs ago', from: '0x05dbc384a27cf826874d588154dfcafa747cfdaa', to: '0x05dbc384a27cf826874d588154dfcafa747cfda8', value: '101 MUSA', txnFee: '1MUSA'}
    ];

    const navigate = useNavigate();

    return(
        <div className={classes.blockTxnsWrapper}>
            <div className={classes.blockChildTxnsWrapper}>
                <div className={classes.addMainDetailsContainer}>
                    <div className={classes.addressNoContainer}>
                        <span className={classes.addNoText}>
                            Transactions of Block: 
                        </span>
                        <span className={classes.addNoValue}>
                            {"  " + blockNo}
                        </span>
                    </div>
                    <div className={classes.tableContainer}>
                        <div className={classes.tableHeadingContainer}>
                            <span className={classes.majorDataText}>
                                Transaction Hash
                            </span>
                            <span className={classes.minorDataText}>
                                Block
                            </span>
                            <span className={classes.minorDataText}>
                                Age
                            </span>
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
                                Txn Fee
                            </span>
                        </div>
                        {
                            txnData.map((data, ind) => {
                                return(
                                    <Fragment key={ind}>
                                        <div className={classes.textDetailsContainer}>
                                        <span className={classes.majorDataText} onClick={() => navigate(`/tx/${data.txnHash}`)}>
                                            {data.txnHash}
                                        </span>
                                        <span className={classes.minorDataText}>
                                            {data.blockNo}
                                        </span>
                                        <span className={classes.minorDataText}>
                                            {data.age}
                                        </span>
                                        <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.from}`)}>
                                            {data.from}
                                        </span>
                                        <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.to}`)}>
                                            {data.to}
                                        </span>
                                        <span className={classes.minorDataText}>
                                            {data.value}
                                        </span>
                                        <span className={classes.minorDataText}>
                                            {data.txnFee}
                                        </span>
                                    </div>
                                    </Fragment>
                                    
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BlockTransactions;