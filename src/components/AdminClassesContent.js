import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile} from './BaseTiles';
import {SquareTile} from './BaseTiles';
import ClassListComponent from './ClassListComponent';
import NotificationListComponent from './NotificationListComponent';
import AgendaComponent from '../components/AgendaComponent';
import ClassDetailsPage from './ClassDetailsPage';

export default function AdminClassesContent(props){
    return (
        <div className="app-content">
            <SectionTitleTile title="Student Page" goToPrevPage={props.goToPrevPage} />
            <button className="right-button" onClick={() => props.goToPage("CreateStudentDataPage")} >Create Student</button>
            <ClassListComponent classList={props.classList} title="My Classes"
                goToPage={props.goToPage} selectClass={props.selectClass}/>
        </div>
    );
}

//example calling other components
//<BaseTile textArray={props.news} title="News" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />