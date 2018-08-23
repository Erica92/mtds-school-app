import React from 'react';
import BaseTile from '../components/BaseTiles';
import Calendar from '../components/CalendarComponent';
import {SectionTitleTile, TileHeader} from '../components/BaseTiles';
import {Spinner} from '../components/BaseComponents';
import * as teacherAPI from '../api/teacherAPI';
import * as parentAPI from '../api/parentAPI';
import $ from 'jquery'; 


export default class CalendarPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            teacherID: this.props.teacherID,
            parentID: this.props.parentID,
            appointmentsList: [],
            schedule: [],
            isLoading: true,
            allLoaded: false,
            eventList: [],
            classList: this.props.classList,
            studentList: this.props.parentStudentList
        }
        
        this.fetchDataTeacherAppointments = teacherAPI.fetchDataTeacherAppointments.bind(this);
        this.fetchDataSchedule = teacherAPI.fetchDataSchedule.bind(this);
        this.fetchDataParentAppointments = parentAPI.fetchDataParentAppointments.bind(this);
        this.loadTeacherEvents = this.loadTeacherEvents.bind(this);
        this.loadParentEvents = this.loadParentEvents.bind(this);
    }
    
    componentDidMount(){
        if(this.props.teacherID){
            //teacherAPI.fetchDataTeacherAppointments(this.props.teacherID);
            this.getAppointmentsAndSchedule().then(([appointmentsList, schedule]) => {
                console.log("both have loaded!");
                
                var eventList = this.makeCalendarEventList(this.state.appointmentsList);
                console.log("eventList:"+eventList.length);
                this.setState({
                    allLoaded: true,
                    eventList: eventList
                });
                console.log(appointmentsList, schedule);
              })
        } else if (this.props.parentID){
            this.fetchDataParentAppointments(this.props.parentID)
                .then( () => {
                
                let eventList = this.makeCalendarEventList(this.state.appointmentsList);

                this.setState({
                    allLoaded: true,
                    eventList: eventList
                });
            });
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
                        eventList={this.state.eventList} classList={this.state.classList} 
                        teacherID={this.state.teacherID} parentID={this.state.parentID} 
                        parentStudentList={this.state.studentList} 
                        loadTeacherEvents={this.loadTeacherEvents}
                        loadParentEvents={this.loadParentEvents} />);
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
            
    makeCalendarEventList(list){

        var color = "#ffffff";
        var _this = this;
        var status = -1;

        let eventList = list.map(function(elem){
            if(elem.StatusTeacher === 0 && elem.StatusParent === 0){
                //if approved, then green
                color = "#E8E8E8";
                status = "deleted";
            } else if(elem.StatusTeacher === 1 && elem.StatusParent === 1){
                //if approved, then green
                color = "#34A853";
                status = "approved";
            } else if((elem.StatusTeacher === 1 && _this.state.teacherID)
                        || (elem.StatusParent === 1 && _this.state.parentID)){
                //if not yet approved by the other, then yellow
                color = "#FFDC72";
                status = "waiting";
            } else {
                //if the approvation of the user is required, then orange
                color = "#FF6600";
                status = "requested";
            }

            return ({
                id: elem.AppointmentID,
                title: elem.Remarks,
                start: new Date(elem.StartTime),
                end: new Date(elem.EndTime),
                allDay: elem.FullDay,
                color: color,
                status: status,
                originalEvent: elem
            });

        });

        return eventList;
    }
    
    loadParentEvents(){
        this.fetchDataParentAppointments(this.props.parentID)
            .then( () => {
            
            let eventList = this.makeCalendarEventList(this.state.appointmentsList);

            this.setState({
                allLoaded: true,
                eventList: eventList
            });
        });
    }

    loadTeacherEvents(){
        this.fetchDataTeacherAppointments(this.props.teacherID)
            .then( () => {
            
            let eventList = this.makeCalendarEventList(this.state.appointmentsList);

            this.setState({
                allLoaded: true,
                eventList: eventList
            });
        });
    }

    getAppointmentsAndSchedule(){
        return Promise.all([
            this.fetchDataTeacherAppointments(this.props.teacherID),
            this.fetchDataSchedule(this.props.teacherID, 'day')
        ])
    }

}