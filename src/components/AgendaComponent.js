import React from 'react';
import {BaseRow} from './BaseComponents';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import * as Utils from '../utils/Utils';

export default function AgendaComponent(props) {

    let agendaList = [];
    console.log("sched"+props.scheduleList);
    let scheduleList = props.scheduleList;
    console.log("scheduleList"+scheduleList);
    
    for(var i = 0; i < scheduleList.length; i++){
        console.log("i: "+scheduleList[i].TeachClass.TeacherID);
        let teachClass = scheduleList[i].TeachClass;
        let rowsSchedule = scheduleList[i].Schedule.map(elem => (
            <div>
                <span>{Utils.formatTimeFromJSON(elem.StartTime)}</span>
                <span>{Utils.formatTimeFromJSON(elem.EndTime)}</span>
                <span>Lesson</span>
                <span>Class {teachClass.ClassID}</span>
                <span>{teachClass.Subject}</span>
            </div>
        ));
        agendaList = agendaList.concat(rowsSchedule);
    }
    
    let rowsAppointments = props.appointmentList.map(elem => (
        <div key={elem.ParentID}>
            <span>{Utils.formatTimeFromJSON(elem.StartTime)}</span>
            <span>{Utils.formatTimeFromJSON(elem.EndTime)}</span>
            <span>Appointment</span>
            <span>{elem.ParentID}</span>
        </div>
    ));
    
    agendaList = agendaList.concat(rowsAppointments);
                                    
    return (
        <div className="base-tile base-tile-half fixed-height">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_24x24.png")} toggleOnClick={() => props.goToPage("CalendarPage")}/>
            <div className="tile-content">        
                {agendaList.length > 0 ? agendaList : (<span>There are no appointments or classes for today</span>) }
            </div>
        </div>
    );
}