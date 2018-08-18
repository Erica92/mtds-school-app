import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile, TileHeader} from './BaseTiles';
import {TableRow, Spinner} from './BaseComponents';
import {InputText} from '../components/InputComponents';

export function PaymentListComponent(props){

    if(props.paymentList && props.paymentList.length > 0){
        
        let rows = props.paymentList.map( (elem) => (
        <div key = {elem.PaymentID}>
            <span>
                {elem.StudentID}
            </span>    
            <span>
                {elem.Description}
            </span>
            <span>
                {new Date(elem.Deadline).toLocaleDateString()}
            </span>
            <span>
                <input className="button-base submit-button" type="button" value="Pay" 
                        onClick={() => props.changeView("payment", props.selectPayment(elem))}/>
            </span>
        </div>
    ));
    
    return (
        <div className="base-tile fixed-height">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_24x24.png")} />
            <div className="tile-content">        
                {rows}
            </div>
        </div>
    );

    } else {
        return (<Spinner />);
    }
}

export function PaymentForm(props){
    return (
        <form id="PaymentForm" onSubmit={props.handleSubmit}>
            <div className="input-group">
                <select name="creditCardType">
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="VisaElectron">VisaElectron</option>
                </select>
                <InputText className="editable" onChange={props.handleInputChange}
                                label="Card Number" name="cardNumber" />
                <InputText className="editable" onChange={props.handleInputChange}
                                label="CVV" name="CVV" />
                <InputText className="editable" onChange={props.handleInputChange}
                                label="Expiration Date" name="expirationDate" />
                <InputText className="editable" onChange={props.handleInputChange}
                                label="Name on card" name="nameOnCard" />
            </div>
            <div>
                <input className="button-base submit-button" type="submit" value="Submit"/>
                <input className="button-base cancel-button" type="button" value="Cancel" onClick={() => this.cancelChanges()} />
            </div>
        </form>
    );
}

export function PaymentDetails(props){
    return (
        <div className="input-group">
            <div><label>Amount</label><span>{props.paymentDetails.Amount}</span></div>
            <div><label>Created on</label><span></span>{props.paymentDetails.CreatedOn}</div>
            <div><label>Deadline</label><span></span>{props.paymentDetails.Deadline}</div>
            <div><label>Description</label><span></span>{props.paymentDetails.Description}</div>
            <div><label>Status</label><span></span>{props.paymentDetails.Status}</div>
            <div><label>StudentID</label><span></span>{props.paymentDetails.StudentID}</div>
            <div><label>Student</label><span></span>{ props.studentInfo ? props.studentInfo.FirstName+" "+props.studentInfo.LastName : "-"}</div>
        </div>
    );
}
/*
1596.71
CreatedOn
:
"2018-04-30T20:10:48Z"
Deadline
:
"2018-05-30T20:10:48Z"
Description
:
"PayDesc1"
ParentID
:
"P1"
PaymentID
:
"PID1"
Status
:
"1"
StudentID
:
"S1"*/