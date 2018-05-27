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
            teacherID: this.props.teacherID,
            appointmentsList: [],
            schedule: [],
            isLoading: true,
            allLoaded: false,
            eventList: [],
            classList: this.props.classList
        }
        
        teacherAPI.fetchDataTeacherAppointments = teacherAPI.fetchDataTeacherAppointments.bind(this);
        teacherAPI.fetchDataSchedule = teacherAPI.fetchDataSchedule.bind(this);
    }
    
    componentDidMount(){
        if(this.props.teacherID){
            //teacherAPI.fetchDataTeacherAppointments(this.props.teacherID);
            this.getAppointmentsAndSchedule().then(([appointmentsList, schedule]) => {
                console.log("both have loaded!");
                
                let eventList = this.makeCalendarEventList(this.state.appointmentsList, '#ff6600');
                console.log("eventList:"+eventList.length);
                this.setState({
                    allLoaded: true,
                    eventList: eventList
                });
                console.log(appointmentsList, schedule);
              })
        }
    }
    componentWillReceiveProps(){
        console.log("receive props");
    }
    componentWillMount(){
        console.log("Mounting CalendarPage");
    }
    componentWillUnmount(){
        console.log("unmounting CalendarPage");
    }
    render(){
        var allLoaded = this.state.allLoaded;
        var toRender;
        
        if(allLoaded){
          toRender = (<Calendar appointmentsList={this.state.appointmentsList} 
                        eventList={this.state.eventList} classList={this.state.classList} teacherID={this.state.teacherID} />);
        } else {
            toRender = <Spinner />                    
        }
        
        return (
            <div className="app-content">
                {toRender}
            </div>
        );
    }
    
    /*fetchAllData(){
        return Promise.all([this.fetchDataTeacherAppointments(this.props.teacherID), this.fetchDataSchedule(this.props.teacherID, 'day')])
    }
            
    fetchAllData()
      .then(([students, scores]) => {
        // both have loaded!
        console.log(students, scores);
    })*/
            
    makeCalendarEventList(list, color){
        let eventList = list.map( elem => 
            ({
                id: elem.AppointmentID,
                title: elem.Remarks,
                start: elem.StartTime,
                end: elem.EndTime,
                allDay: elem.FullDay,
                color: color
            }));
        return eventList;
    }
    
    getAppointmentsAndSchedule(){
        return Promise.all([
            teacherAPI.fetchDataTeacherAppointments(this.props.teacherID),
            teacherAPI.fetchDataSchedule(this.props.teacherID, 'day')
        ])
    }

}