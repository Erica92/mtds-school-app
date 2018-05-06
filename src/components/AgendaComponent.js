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
        agendaList.push(rowsSchedule);
    }
    
    let rowsAppointments = props.appointmentList.map(elem => (
        <div>
            <span>{Utils.formatTimeFromJSON(elem.StartTime)}</span>
            <span>{Utils.formatTimeFromJSON(elem.EndTime)}</span>
            <span>Appointment</span>
            <span>{elem.ParentID}</span>
        </div>
    ));
    
    agendaList.push(rowsAppointments);
                                    
    return (
        <div className="base-tile limit-max-height">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">        
                {agendaList}
            </div>
        </div>
    );
}