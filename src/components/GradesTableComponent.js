import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import {ModalInsertSingleGrade} from './ModalComponents';
import * as Modals from './ModalComponents';
import * as Utils from '../utils/Utils';

export function GradesOverviewTable(props){
    let subjectRow = props.gradesList.map((elem, index) => (
        <tr key={elem.Subject} className="grades-overview-row">
            <td onClick={() => props.showSubjectView(index)} className="clickable">{elem.Subject}</td>
            <td></td>
            <td>{elem.GradeSummaries.length > 0 ? Math.round(elem.GradeSummaries[0].Grade * 100) / 100 : "" }</td>
            <td></td>
            <td>{elem.GradeSummaries.length > 1 ?Math.round(elem.GradeSummaries[1].Grade * 100) / 100 : "" }</td>
        </tr>
    ));
                                   
    return (
        <div className="base-tile">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">
                <div className="row-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th colSpan="2">First Semester</th>
                                <th colSpan="2">Second Semester</th>
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
              </div>
        </div>
    );
}

//formatDateFromJSON
export function SubjectGradesTable(props){
    var gradesOfSubject = props.gradesList[0];
    console.log("props.gradesList"+props.gradesList.length);
    console.log("gradesOfSubject"+gradesOfSubject.length);

//    let gradesOfSubject = props.gradesList.filter((value, index, arr, subj) => {
//            console.log("filterSubject:"+value);
//            return value.Subject == subj;
//        });
    
    console.log("props.gradesList[0][]"+JSON.stringify(props.gradesList[0]));

    console.log("gradesOfSubject"+gradesOfSubject.length);
//    let gradesRow = gradesOfSubject[0].Grades.map(elem => (
//        <tr>
//            <td>{elem.Date}</td>
//            <td>{Math.round(elem.Grade * 100) / 100}</td>
//            <td>{elem.Type}</td>
//            <td>{elem.Remarks}</td>
//        </tr>
//    ));
    
    let gradesRow = gradesOfSubject.Grades.map(elem => (
        <tr>
            <td>{Utils.formatDateFromJSON(elem.Date)}</td>
            <td>{Math.round(elem.Grade * 100) / 100}</td>
            <td>{elem.Type}</td>
            <td>{elem.Remarks}</td>
        </tr>
    ));
             
    return (
        <div className="base-tile">
            <TileHeader text={gradesOfSubject.Subject+" Grades"} toggleImg={require("../images/launch_white_18x18.png")} />
            <div onClick={() => props.showView('overview')}>Overview</div>
            <div className="tile-content">
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
            </div>
        </div>
    );
}


