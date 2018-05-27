import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile} from './BaseTiles';
import {SquareTile} from './BaseTiles';
import NotificationListComponent from './NotificationListComponent';
import StudentListComponent from './StudentListComponent';
import AgendaComponent from './AgendaComponent';

export default function ParentDashboard(props){
    return (
        <div className="app-content">
            <NotificationListComponent title="Notifications" notificationList={props.notificationList} />
            <AgendaComponent title="Today's Agenda" appointmentList={props.appointmentList} 
                scheduleList={new Array()} goToPage={props.goToPage} />
            <StudentListComponent studentList={props.studentList} onClickElem={props.goToPage} />
        </div>
    );
}

//example calling other components
//<BaseTile textArray={props.news} title="News" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />