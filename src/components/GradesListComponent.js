import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import {BaseProfileComponent, BasePersonComponent} from './BaseComponents';

export default function GradesListComponent(props){
    let rows = props.studentGradesList.map(studentElem => (
        <div className="row clickable" key={studentElem.BasicStudent.Username} >
            <div>
                <BasePersonComponent FirstName={studentElem.BasicStudent.FirstName} LastName={studentElem.BasicStudent.LastName}
                    avatarUrl={studentElem.BasicStudent.ProfilePic} />
                <GradeRow gradesList={studentElem.Grade} />
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
    let row = props.gradesList.map(grade => <span>{Math.round(grade.Grade * 100) / 100}</span>);
                                   
    return (
        <div className="row-content">
            {row}
        </div>
    );
}