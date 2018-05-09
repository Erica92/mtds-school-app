import React from 'react';
import './Modals.css';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';


export function ModalInsertSingleGrade(props){
    const FORMAT = 'MM/DD/YYYY';
    
    return (
        <div id="singleGradeModal" class="modal">
          <div class="modal-content">
            <span class="close" onClick={() => closeModals("singleGradeModal")} >&times;</span>
            <div>
                <div>{props.FirstName} {props.LastName}</div>
                <div>
                    <DayPickerInput />
                </div>
                <div>
                    <select>
                        <option value="Homework">Homework</option>
                        <option value="Oral">Oral</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Exam">Exam</option>
                    </select>
                </div>
                <div>
                     <input type="textarea" />
                </div>
            </div>
          </div>
        </div>
    );
}

export function openModal(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}
function closeModals(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}


