import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import {BaseProfileComponent, BasePersonComponent} from './BaseComponents';
import {ModalInsertSingleGrade} from './ModalComponents';
import * as Modals from './ModalComponents';

export default function GradesListComponent(props){
    let rows = props.studentGradesList.map(studentElem => (
        <div className="" key={studentElem.BasicStudent.Username} >
            <div>
                <BasePersonComponent FirstName={studentElem.BasicStudent.FirstName} LastName={studentElem.BasicStudent.LastName}
                    avatarUrl={studentElem.BasicStudent.ProfilePic} />
                <GradeRow gradesList={studentElem.Grade} createObject={props.createObject} username={studentElem.BasicStudent.StudentID}/>
                <ModalInsertSingleGrade student={studentElem.BasicStudent} 
                    handleInputChange={props.handleInputChange} handleSubmitSingleGrade={props.handleSubmitSingleGrade} 
                    handleDayClick={props.handleDayClick} createObject={props.createObject} />
            </div>
        </div>
    ));
                                    
    return (
        <div className="base-tile">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">        
                {rows}
            </div>
        </div>
    );
}

function GradeRow(props){
    let row = props.gradesList.map(grade => (
        <span className="basic-grade-container">
            <span className="basic-grade">{Math.round(grade.Grade * 100) / 100}</span>
        </span>));
                                   
    return (
        <div className="row-content">
            <div className="grades-row-container">
                {row}
            </div>
            <span className="clickable" onClick={() => Modals.openModal("singleGradeModal", props.createObject(props.username))}>
                <img src={require("../images/add_circle_outline_grey_36x36.png")} />
            </span>
        </div>
    );
}

