import React from 'react';
import './Modals.css';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';


export function ModalInsertSingleGrade(props){
    const FORMAT = 'MM/DD/YYYY';
    //<DayPickerInput dayPickerProps={{todayButton: 'Today'}} onDayClick={props.handleDayClick} />
    return (
        <div id="singleGradeModal" class="modal">
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
    return(
        <div id="viewEventModal" className="modal">
            <div className="modal-content modal-small">
                <span className="close" onClick={() => closeModals("viewEventModal")} >&times;</span>
                        
                    <h1>{props.event.title}</h1>
                    <label>Full Day Event</label>
                    <input type="checkbox" disabled />

                    <label>Start Date and time</label>
                    <input type="datetime" disabled />

                    <label>End Date and time</label>
                    <input type="datetime" disabled />
                        
            </div>       
        </div>
    );
}

export function ModalAddEvent(props){
    var classList = props.classList.map( elem => (<option value={elem.ClassID} key={elem.ClassID}>{elem.ClassID} - {elem.Subject}</option>));
    var studentClassList = props.studentClassList.map( elem => (<option value={elem.Username}>{elem.LastName} {elem.FirstName}</option>));
    
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
                    <input className="input-base" type="text" name="title" onChange={props.handleInputChange} />

                    <label>Full Day Event</label>
                    <input className="input-checkbox" type="checkbox" name="Fullday" onChange={props.handleInputChange} />

                    <label>Start Date and time</label>
                    <input className="input-base" type="datetime-local" name="StartTime" onChange={props.handleInputChange} />

                    <label>End Date and time</label>
                    <input className="input-base" type="datetime-local" name="EndTime" onChange={props.handleInputChange} />

                    <label>Note</label>
                    <textarea name="Remarks" onChange={props.handleInputChange} />
                
                    <input className="button-base submit-button" type="submit" value="Submit" />
                </form>
            </div>       
        </div>
    );
}

export function ModalAddEventParent(props){
    
    return(
        <div id="addEventModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => closeModals("addEventModal")} >&times;</span>
                <form id="addEventForm" method="POST" onSubmit={props.onSubmit} >
                    <h1>Add New Event</h1>
                    
                    <label>Title</label>
                    <input className="input-base" type="text" name="title" onChange={props.handleInputChange} />

                    <label>Full Day Event</label>
                    <input className="input-checkbox" type="checkbox" name="Fullday" onChange={props.handleInputChange} />

                    <label>Start Date and time</label>
                    <input className="input-base" type="datetime-local" name="StartTime" onChange={props.handleInputChange} />

                    <label>End Date and time</label>
                    <input className="input-base" type="datetime-local" name="EndTime" onChange={props.handleInputChange} />

                    <label>Note</label>
                    <textarea name="Remarks"onChange={props.handleInputChange}  />
                
                    <input className="button-base submit-button" type="submit" value="Submit" />
                </form>
            </div>       
        </div>
    );
}

export function ModalResult(props){
    return (
        <div id="resultModal" className="modal">
            <div class="modal-content modal-small-result">
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


