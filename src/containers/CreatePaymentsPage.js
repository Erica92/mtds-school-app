import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import {InputText,InputDate} from '../components/InputComponents';
import {ModalResult} from '../components/ModalComponents';
import * as Modals from '../components/ModalComponents';
import * as ApiCalls from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';



export default function CreatePaymentsPage(props) {

        var classList = props.classList.map( elem => (<option value={elem.ClassID} key={elem.ClassID}>{elem.ClassID}</option>));
        var studentClassList = props.studentClassList.map( elem => (<option value={elem.Username}>{elem.LastName} {elem.FirstName}</option>));

        return (
            <div className="app-content">
                <SectionTitleTile title="New Payment" goToPrevPage={props.goToPrevPage} />
                <form id="DataForm" onSubmit={ props.handleSubmit}>
                    <div className="input-group">
                        <span>Select a student:</span>
                        <p>
                        <select className="input-base" name="class" onChange={props.loadStudentInClass}>{classList}</select>
                        <select className="input-base" name="StudentId" onChange={props.handleInputChange} >{studentClassList}</select>
                        </p>
                        <InputText className="editable" label="Description" name="Description" onChange={props.handleInputChange} value={props.payment.desc} />
                        <InputText className="editable" label="Amount" name="Amount" onChange={props.handleInputChange} value={props.payment.amount}/>
                        <InputDate className="editable" label="Deadline" name="DeadLine" onChange={props.handleInputChange} value={props.payment.deadline} />
                    </div>
                    <div>
                        <input className="button-base submit-button" type="submit" value="Submit" />
                        <input className="button-base cancel-button" type="button" value="Cancel" onClick={() => cancelChanges()} />
                    </div>
                </form>
                {/*               <ModalResult text={this.state.modificationResult} buttonText="OK" callBackFn={this.props.goToPrevPage} /> */}
            </div>


        );




    function cancelChanges(){
        console.log("cancelChanges");
    }

}