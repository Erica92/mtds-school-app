import React from 'react';
import {Spinner, BasePersonComponent} from './BaseComponents';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';

export default function StudentListComponent(props){
    var studentRows;
    if(props.studentList && props.studentList.length > 0){
        studentRows = props.studentList.map(elem => (
            <BasePersonComponent key={elem.Username} FirstName={elem.FirstName} LastName={elem.LastName} avatarUrl={elem.ProfilePic} 
                onClick={() => props.onClickElem(elem, props.callBackFn())} />
            //<BaseRow title={elem.FirstName} text={elem.LastName} date={elem.GPA} key={elem.Username} />
        ));
    } else {
        studentRows = (<Spinner />);
    }
    
    return (
        <div className="base-tile">
            <TileHeader text="Students" toggleImg={require("../images/launch_white_24x24.png")} />
            <div className="tile-content">        
                {studentRows}
            </div>
        </div>
    );
}