import React from 'react';
import {BaseRow} from './BaseComponents';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';

export default function StudentListComponent(props){
    var studentRows = props.studentList.map(elem => (
        <BaseRow title={elem.FirstName} text={elem.LastName} date={elem.GPA} key={elem.Username} />
    ));
    
    return (
        <div className="base-tile">
            <TileHeader text="Students" toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">        
                {studentRows}
            </div>
        </div>
    );
}