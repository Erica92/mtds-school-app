import React from 'react';
import BaseTile from '../components/BaseTiles';
import Calendar from '../components/CalendarComponent';
import {SectionTitleTile, TileHeader} from '../components/BaseTiles';
import {Spinner} from '../components/BaseComponents';
import * as teacherAPI from '../api/teacherAPI';
import $ from 'jquery'; 


export default class CalendarPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            appointmentsList: [],
            isLoading: true,
            eventList: []
        }
        
        teacherAPI.fetchDataTeacherAppointments = teacherAPI.fetchDataTeacherAppointments.bind(this);
    }
    
    componentDidMount(){
        if(this.props.teacherID){
            teacherAPI.fetchDataTeacherAppointments(this.props.teacherID);
        }
    }
    
    render(){
        var isLoading = this.state.isLoading;
        var toRender;
        
        if(!isLoading){
            if(this.state.eventList.length == 0){
                var eventList = this.makeCalendarEventList();
                toRender = (<Calendar appointmentsList={this.state.appointmentsList} eventList={eventList} />);
            }
        } else {
            toRender = <Spinner />                    
        }
        
        return (
            <div className="app-content">
                {toRender}
            </div>
        );
    }
    
    makeCalendarEventList(){
        let eventList = this.state.appointmentsList.map( elem => 
            ({
                id: elem.AppointmentID,
                title: 'Appontment with '+elem.ParentID,
                start: elem.StartTime,
                end: elem.EndTime,
                allDay: elem.FullDay,
                color: '#ff6600'
            }));
        return eventList;
    }
    

}