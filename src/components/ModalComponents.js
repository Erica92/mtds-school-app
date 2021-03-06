import React from 'react';
import './Modals.css';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';
import * as Utils from '../utils/Utils';


export function ModalInsertSingleGrade(props){
    const FORMAT = 'MM/DD/YYYY';
    //<DayPickerInput dayPickerProps={{todayButton: 'Today'}} onDayClick={props.handleDayClick} />
    return (
        <div id="singleGradeModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModals("singleGradeModal")} >&times;</span>
            <form id="SingleGradeForm" method="POST" onSubmit={props.handleSubmitSingleGrade} >
                <div>Insert Grade</div>
                <div>Student: {props.student.FirstName} {props.student.LastName}</div>
                <input type="hidden" name="StudentID" value={props.student.StudentID} />
                <div>
                    <label>Date</label>
                    <input type="date" name="Date" onChange={props.handleInputChange} />
                </div>
                <div>
                    <label>Type of Grade</label>
                    <select name="Type" onChange={props.handleInputChange} >
                        {Utils.EMPTY_SELECT}
                        <option value="Homework">Homework</option>
                        <option value="Oral">Oral</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Exam">Exam</option>
                    </select>
                </div>
                <div>
                    <label>Grade</label>
                    <input type="number" name="Grade" step="0.01" min="0" max="10" onChange={props.handleInputChange} />
                </div>
                <div>
                    <label>Remarks</label>
                    <textarea name="Remarks" onChange={props.handleInputChange} />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
          </div>
        </div>
    );
}

export function ModalViewEvent(props){
    var statusText = "";
    var acceptComponent = "";

    switch(props.event.status){
        case "approved":
            statusText = "Accepted";
            break;
        case "waiting":
            statusText = "Waiting for acceptance";
            break;
        case "requested":
            statusText = "Request for appointment";
            acceptComponent = (<div>
                                <span>Accept?</span>
                                    <input type="button" value="YES" onClick={() => props.acceptAppointment()} />
                                    <input type="button" value="NO" onClick={() => props.rejectAppointment()} />
                                </div>);
            break;
         case "deleted":
            statusText = "Deleted";
            break;
    }

    return(
        <div id="viewEventModal" className="modal">
            <div className="modal-content modal-small">
                <span className="close" onClick={() => closeModals("viewEventModal")} >&times;</span>
                <form id="modifyEventForm" method="POST" onSubmit={props.onSubmit} >    
                    <span>{statusText}</span>
                    <h2>{props.event.Remarks}</h2>

                    <label>Partecipant</label>
                    <span>{props.partecipantInfo ? props.partecipantInfo.FirstName + " " + props.partecipantInfo.LastName : "-"}</span>
                    
                    <label>Full Day Event</label>
                    <input className="input-checkbox" type="checkbox" name="Fullday" value={props.event ? props.event.Fullday : ""} onChange={props.handleInputChange} />

                    <label>Start Date and time</label>
                    <input className="input-base" type="datetime-local" name="StartTime" value={props.event ? props.event.StartTime : ""} onChange={props.handleInputChange} />

                    <label>End Date and time</label>
                    <input className="input-base" type="datetime-local" name="EndTime" value={props.event ? props.event.EndTime : ""} onChange={props.handleInputChange} />

                    {acceptComponent} 

                    {props.event.status === "waiting" ? (<div> <input className="button-base submit-button" type="submit" value="Submit" /></div>) : (<div></div>) }
                </form>
            </div>       
        </div>
    );
}

export function ModalAddEvent(props){
    var emptyElem = Utils.EMPTY_SELECT;
    
    var classList = props.classList.map( elem => (<option value={elem.ClassID} key={elem.ClassID}>{elem.ClassID} - {elem.Subject}</option>));
    classList.unshift(emptyElem);
    var studentClassList = props.studentClassList.map( elem => (<option value={elem.Username}>{elem.LastName} {elem.FirstName}</option>));
    studentClassList.unshift(emptyElem);

    return(
        <div id="addEventModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => closeModals("addEventModal")} >&times;</span>
                <form id="addEventForm" method="POST" onSubmit={props.onSubmit} >
                    <h1>Add New Event</h1>
                    <span>Select a student:</span>
                    <select className="input-base" name="class" onChange={props.loadStudentInClass}>{classList}</select>
                    <select className="input-base" name="StudentID" onChange={props.handleInputChange} >{studentClassList}</select>
                    
                    <label>Title</label>
                    <input className="input-base input-base-long" type="text" name="Remarks" onChange={props.handleInputChange} />

                    <label>Full Day Event</label>
                    <input className="input-checkbox" type="checkbox" name="Fullday" onChange={props.handleInputChange} />

                    <label>Start Date and time</label>
                    <input className="input-base" type="datetime-local" name="StartTime" onChange={props.handleInputChange} />

                    <label>End Date and time</label>
                    <input className="input-base" type="datetime-local" name="EndTime" onChange={props.handleInputChange} />
                
                    <input className="button-base submit-button" type="submit" value="Submit" />
                </form>
            </div>       
        </div>
    );
}

export function ModalAddEventParent(props){
    var emptyElem = Utils.EMPTY_SELECT;

    var studentList = props.parentStudentList.map( elem => (<option value={elem.Username} key={elem.Username}>{elem.FirstName}</option>));
    studentList.unshift(emptyElem);
    var teachings = props.teachings.map( elem => (<option value={elem.TeacherID}>{elem.Subject}</option>));
    teachings.unshift(emptyElem);

    return(
        <div id="addEventModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => closeModals("addEventModal")} >&times;</span>
                <form id="addEventForm" method="POST" onSubmit={props.onSubmit} >
                    <h1>Add New Event</h1>
                    <label>Select a teacher:</label>
                    <select className="input-base" name="StudentID" onChange={props.loadStudentTeachers} >{studentList}</select>
                    <select className="input-base" name="TeacherID" onChange={props.handleInputChange} >{teachings}</select>
                    
                    <label>Title</label>
                    <input className="input-base input-base-long" type="text" name="Remarks" onChange={props.handleInputChange} />

                    <label>Full Day Event</label>
                    <input className="input-checkbox" type="checkbox" name="Fullday" onChange={props.handleInputChange} />

                    <label>Start Date and time</label>
                    <input className="input-base" type="datetime-local" name="StartTime" onChange={props.handleInputChange} />

                    <label>End Date and time</label>
                    <input className="input-base" type="datetime-local" name="EndTime" onChange={props.handleInputChange} />
                
                    <input className="button-base submit-button" type="submit" value="Submit" />
                </form>
            </div>       
        </div>
    );
}

export function ModalResult(props){
    return (
        <div id="resultModal" className="modal">
            <div className="modal-content modal-small-result">
                <span className="close" onClick={() => closeModals("resultModal", (props.callBackFn ? props.callBackFn() : null))} >&times;</span>
                        
                    <h2 className="modal-text">{props.text}</h2>
                    <input type="button" className="button-base modal-ok-button" value={props.buttonText} 
                        onClick={() => closeModals("resultModal",(props.callBackFn ? props.callBackFn() : null))} />
                        
            </div>       
        </div>
    );
}

export function openModal(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}
export function closeModals(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}


