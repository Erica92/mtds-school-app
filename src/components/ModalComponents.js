import React from 'react';
import './Modals.css';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';


export function ModalInsertSingleGrade(props){
    const FORMAT = 'MM/DD/YYYY';
    //<DayPickerInput dayPickerProps={{todayButton: 'Today'}} onDayClick={props.handleDayClick} />
    return (
        <div id="singleGradeModal" class="modal">
          <div class="modal-content">
            <span class="close" onClick={() => closeModals("singleGradeModal")} >&times;</span>
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
            <div class="modal-content modal-small">
                <span class="close" onClick={() => closeModals("viewEventModal")} >&times;</span>
                        
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
    var classList = props.classList.map( elem => (<option value={elem.ClassID}>{elem.ClassID} - {elem.Subject}</option>));
    var studentClassList = props.studentClassList.map( elem => (<option value={elem.StudentID}>{elem.LastName} {elem.FirstName}</option>));
    
    return(
        <div id="addEventModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => closeModals("addEventModal")} >&times;</span>
                <form id="addEventForm" method="POST" onSubmit={props.onSubmit} >
                    <h1>Add New Event</h1>
                    <span>Select a student:</span>
                    <select name="class" onChange={props.loadStudentInClass}>{classList}</select>
                    <select name="StudentID" onChange={props.handleInputChange} >{studentClassList}</select>
                    
                    <label>Title</label>
                    <input type="text" name="title" onChange={props.handleInputChange} />

                    <label>Full Day Event</label>
                    <input type="checkbox" name="fullday" onChange={props.handleInputChange} />

                    <label>Start Date and time</label>
                    <input type="datetime-local" name="startDate" onChange={props.handleInputChange} />

                    <label>End Date and time</label>
                    <input type="datetime-local" name="endDate" onChange={props.handleInputChange} />

                    <label>Note</label>
                    <textarea name="Remarks" />
                
                    <input type="submit" value="Submit" />
                </form>
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


