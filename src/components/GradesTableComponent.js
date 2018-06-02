import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import {ModalInsertSingleGrade} from './ModalComponents';
import * as Modals from './ModalComponents';

export default function GradesTableComponent(props){
                                
    return (
        <div>
        <div className="base-tile">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">        
                <OverviewTable gradesList={props.gradesList} />
            </div>
        </div>
        <div className="base-tile">
            <div className="tile-content">        
                <SubjectGradesTable gradesList={props.gradesList} subject="SubjectName1" />
            </div>
        </div>
        </div>
    );
}

function OverviewTable(props){
    let subjectRow = props.gradesList.map(elem => (
        <tr>
            <td>{elem.Subject}</td>
            <td></td>
            <td>{Math.round(elem.GradeSummaries[0].Grade * 100) / 100}</td>
            <td></td>
            <td>{Math.round(elem.GradeSummaries[1].Grade * 100) / 100}</td>
        </tr>
    ));
                                   
    return (
        <div className="row-content">
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th colspan="2">First Semester</th>
                        <th colspan="2">Second Semester</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Average</th>
                        <th>Final Grade</th>
                        <th>Average</th>
                        <th>Final Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {subjectRow}
                </tbody>
            </table>
        </div>
    );
}

//formatDateFromJSON
function SubjectGradesTable(props){
    var lista = props.gradesList;
    console.log("props.gradesList"+props.gradesList.length);

    let gradesOfSubject = props.gradesList.filter((value, index, arr, subj) => {
            console.log("filterSubject:"+value);
            return value.Subject == subj;
        });
    
    console.log("props.gradesList[0][]"+JSON.stringify(props.gradesList[0]));
    var elem0 = lista[0];
    console.log("gradesOfSubject"+gradesOfSubject.length);
//    let gradesRow = gradesOfSubject[0].Grades.map(elem => (
//        <tr>
//            <td>{elem.Date}</td>
//            <td>{Math.round(elem.Grade * 100) / 100}</td>
//            <td>{elem.Type}</td>
//            <td>{elem.Remarks}</td>
//        </tr>
//    ));
    
    let gradesRow = gradesOfSubject.map(subj => (subj.map(elem => (
        <tr>
            <td>{elem.Date}</td>
            <td>{Math.round(elem.Grade * 100) / 100}</td>
            <td>{elem.Type}</td>
            <td>{elem.Remarks}</td>
        </tr>
    ))));
             
    return (
        <div className="row-content">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Grade</th>
                        <th>Type</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {gradesRow}
                </tbody>
            </table>
        </div>
    );
}


