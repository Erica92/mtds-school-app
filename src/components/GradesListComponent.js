import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import {BaseProfileComponent} from './BaseComponents';

export default function GradesListComponent(props){
    let rows = props.studentGradesList.map(studentElem => (
        <div className="row clickable" key={studentElem.Student.Username} >
            <div className="centered-div" >
                {studentElem.Student.FirstName}-{studentElem.Student.LastName}-{studentElem.Grade.Grade}
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
    //let row = props.gradesList.map(grade => );
    return ({
        
    });
}