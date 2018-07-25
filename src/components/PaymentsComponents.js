import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile, TileHeader} from './BaseTiles';
import {TableRow} from './BaseComponents';
import {InputText} from '../components/InputComponents';

export function PaymentListComponent(props){
    
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
                <input className="button-base submit-button" type="button" value="Pay" onClick={() => props.changeView("payment")}/>
            </span>
        </div>
    ));
    
    return (
        <div className="base-tile fixed-height">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_24x24.png")} />
            <div className="tile-content">        
                <table>
                    {rows}
                </table>
            </div>
        </div>
    );
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
