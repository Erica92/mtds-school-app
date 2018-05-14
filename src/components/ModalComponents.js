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

export function openModal(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}
export function closeModals(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}


