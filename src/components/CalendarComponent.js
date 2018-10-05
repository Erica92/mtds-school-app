import React from 'react';
import './Calendar.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import '../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import * as Modals from './ModalComponents';
import {ModalViewEvent, ModalAddEvent, ModalAddEventParent, ModalResult} from './ModalComponents';
import * as Utils from '../utils/Utils';
import * as TeacherApi from '../api/teacherAPI';
import * as ParentApi from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';

import $ from 'jquery';
window.jQuery = $;
require('fullcalendar');

export default class Calendar extends React.Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
            teacherID: this.props.teacherID,
            parentID: this.props.parentID,
            eventList: this.props.eventList,
            selectedEvent: {},
            classList: this.props.classList,
            studentClassList: [],
            parentStudentList: this.props.parentStudentList,
            teachings: [],
            resultMessage: ""
        }
        this.updateSelectedEvent = this.updateSelectedEvent.bind(this);
        this.fetchDataStudentClass = TeacherApi.fetchDataStudentClass.bind(this);
        this.fetchDataTeachings = ParentApi.fetchDataTeachings.bind(this);
        this.loadStudentTeachers = this.loadStudentTeachers.bind(this);
        this.makeEmptyEvent = this.makeEmptyEvent.bind(this);
        this.handleSubmitEventParent = this.handleSubmitEventParent.bind(this);
        this.handleSubmitEventTeacher = this.handleSubmitEventTeacher.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleModifyEvent = this.handleModifyEvent.bind(this);
        this.loadStudentInClass = this.loadStudentInClass.bind(this);
        this.acceptAppointment = this.acceptAppointment.bind(this);
        this.rejectAppointment = this.rejectAppointment.bind(this);
        this.postAppointmentChange = this.postAppointmentChange.bind(this);
        this.refreshEvents = this.refreshEvents.bind(this);
        this.fetchDataPersonalDataParent = ParentApi.fetchDataPersonalDataParent.bind(this);
        this.fetchDataPersonalDataTeacher = TeacherApi.fetchDataPersonalDataTeacher.bind(this);
        this.callBackRefreshEvents = this.callBackRefreshEvents.bind(this);

    }
    
    render() {
        var modalAddEventToRender;
        var partecipantInfo = this.state.teacherInfo ? this.state.teacherInfo : this.state.parentInfo;
        
        if(this.state.teacherID){
            console.log("render teacher calendar");
            modalAddEventToRender = (<ModalAddEvent event={this.state.selectedEvent} 
                    classList={this.state.classList} loadStudentInClass={this.loadStudentInClass} studentClassList={this.state.studentClassList}
                    onSubmit={this.handleSubmitEventTeacher} handleInputChange={this.handleInputChange} />);
        } else if(this.state.parentID){
            console.log("render parent calendar");
            modalAddEventToRender = (<ModalAddEventParent event={this.state.selectedEvent} parentStudentList={this.state.parentStudentList}
                    teachings={this.state.teachings}
                    onSubmit={this.handleSubmitEventParent} handleInputChange={this.handleInputChange} loadStudentTeachers={this.loadStudentTeachers}/>);
        }
        return (
            <div>
                <div id="calendar"></div>
                <ModalViewEvent event={this.state.selectedEvent} 
                                acceptAppointment={this.acceptAppointment} rejectAppointment={this.rejectAppointment}
                                onSubmit={this.handleSubmitEventParent} handleInputChange={this.handleInputChange}
                                partecipantInfo = {partecipantInfo} onSubmit={this.handleModifyEvent} />
                <ModalResult text={this.state.resultMessage.message} buttonText="OK" callBackFn={this.refreshEvents} />
                {modalAddEventToRender}
            </div>
        );
    }
    
    makeEmptyEvent(){
        return({title: '', start:'', end:'', allDay:false});
    }
    

    componentDidMount() {
        var _this = this;

        $('#calendar').fullCalendar({
                    customButtons: {
                        addEventButton: {
                          text: 'New Appointment',
                          click: function() {
                            _this.newEvent();
                            Modals.openModal("addEventModal");
                          }
                        }
                      },
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'addEventButton month,agendaWeek,agendaDay'
                    },
                    events: function(start, end, timezone, callback){
                        callback(_this.state.eventList);
                    },
                    timeFormat: 'H:mm', // uppercase H for 24-hour clock
                    eventClick: function(calEvent, jsEvent, view){
                        _this.updateSelectedEvent(calEvent);
                        Modals.openModal("viewEventModal");
                    }
            });
        
            var noTime = $.fullCalendar.moment('2014-05-01');
            var local = $.fullCalendar.moment('2014-05-01T12:00:00');
            var utc = $.fullCalendar.moment.utc('2014-05-01T12:00:00');
            var noTZ = $.fullCalendar.moment.parseZone('2014-05-01T12:00:00');
    }
    
    componentWillMount(){
        console.log("Mounting CalendarComponent");
    }
    componentWillUnmount(){
        console.log("unmounting CalendarComponent");
    }

    componentDidUpdate() {
        var _this = this;
        
        
        //$('#calendar').fullCalendar( 'refetchEvents' );
/*                            //remove old data
        $('#calendar').fullCalendar('removeEvents');                     
                    //Getting new event json data
        $("#calendar").fullCalendar('addEventSource', this.state.eventList);
                    //Updating new events
        $('#calendar').fullCalendar('rerenderEvents');
                    //getting latest Events
        $('#calendar').fullCalendar( 'refetchEvents' );
*/
        
        //$('#calendar').fullCalendar( 'refetchEvents' );
        /*$('#calendar').fullCalendar('destroy');

        $('#calendar').fullCalendar({
                    customButtons: {
                        addEventButton: {
                          text: 'New Appointment',
                          click: function() {
                            _this.newEvent();
                            Modals.openModal("addEventModal");
                          }
                        }
                      },
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'addEventButton month,agendaWeek,agendaDay'
                    },
                    events: this.state.eventList,
                    timeFormat: 'H:mm', // uppercase H for 24-hour clock
                    eventClick: function(calEvent, jsEvent, view){
                        _this.updateSelectedEvent(calEvent);
                        Modals.openModal("viewEventModal");
                    }
            });*/
    }

    handleModifyEvent(event){
        event.preventDefault();
        var selectedEventTmp = this.state.selectedEvent;
        selectedEventTmp.StartTime = new Date(selectedEventTmp.StartTime);
        selectedEventTmp.EndTime = new Date(selectedEventTmp.EndTime);

        delete selectedEventTmp.status;
        delete selectedEventTmp.color;

        this.postAppointmentChange(selectedEventTmp);
        Modals.closeModals("viewEventModal");
    }
    
    handleSubmitEventParent(event) {
        event.preventDefault();
        var selectedEventTmp = this.state.selectedEvent;
        selectedEventTmp["ParentID"] = (this.state.parentID ? this.state.parentID : '');
        selectedEventTmp.Fullday = ( selectedEventTmp.Fullday ? selectedEventTmp.Fullday : false );
        //selectedEventTmp["StudentID"] = '';
        selectedEventTmp.Status = 0,
        selectedEventTmp.StatusTeacher = (this.state.teacherID ? 1 : 0 );
        selectedEventTmp.StatusParent =  (this.state.parentID ? 1 : 0 );
        selectedEventTmp.AppointmentID = 0,

        selectedEventTmp.StartTime = new Date(selectedEventTmp.StartTime);
        selectedEventTmp.EndTime = new Date(selectedEventTmp.EndTime);
        
        delete selectedEventTmp['class'];
        //delete selectedEventTmp['title'];
        
        this.setState({
          selectedEvent: selectedEventTmp
        });
        this.postAppointment();
        Modals.closeModals("addEventModal");
    }

    handleSubmitEventTeacher(event) {
        event.preventDefault();
        var selectedEventTmp = this.state.selectedEvent;
        selectedEventTmp["TeacherID"] = (this.state.teacherID ? this.state.teacherID : '');
        selectedEventTmp["ParentID"] = (this.state.parentID ? this.state.parentID : '');
        selectedEventTmp.Fullday = ( selectedEventTmp.Fullday ? selectedEventTmp.Fullday : false );
        //selectedEventTmp["StudentID"] = '';
        selectedEventTmp.Status = 0,
        selectedEventTmp.StatusTeacher = (this.state.teacherID ? 1 : 0 );
        selectedEventTmp.StatusParent =  (this.state.parentID ? 1 : 0 );
        selectedEventTmp.AppointmentID = 0,

        selectedEventTmp.StartTime = new Date(selectedEventTmp.StartTime);
        selectedEventTmp.EndTime = new Date(selectedEventTmp.EndTime);

        delete selectedEventTmp['class'];
        //delete selectedEventTmp['title'];
        
        this.setState({
          selectedEvent: selectedEventTmp
        });
        this.postAppointment();
        Modals.closeModals("addEventModal");
    }
    //{"StudentID":"","title":"aaaaaaaaa","fullday":false,"startDate":"2018-05-22T10:30","endDate":"2018-05-22T12:30","ParentID":""} why?
    /*
    AppointmentID: 1,
TeacherID: "TFirstName1 TLastName1",
ParentID: "P1",
FullDay: false,
StartTime: "2018-05-20T17:16:23Z",
EndTime: "2018-05-20T18:16:23Z",
Remarks: "",
Status: 1,
StatusTeacher: 1,
StatusParent: 1
    */
    acceptAppointment() {
        var eventAccepted = Object.assign({}, this.state.selectedEvent);
        eventAccepted.StatusTeacher = 1;
        eventAccepted.StatusParent = 1;
        eventAccepted.Status = 1;

        eventAccepted.StartTime = new Date(eventAccepted.StartTime);
        eventAccepted.EndTime = new Date(eventAccepted.EndTime);

        delete eventAccepted.status;
        delete eventAccepted.color;

        this.setState({selectedEvent: eventAccepted});
        this.postAppointmentChange(eventAccepted);
    }

    rejectAppointment() {
        var eventAccepted = Object.assign({}, this.state.selectedEvent);
        eventAccepted.StatusTeacher = 0;
        eventAccepted.StatusParent = 0;
        eventAccepted.Status = 0;

        eventAccepted.StartTime = new Date(eventAccepted.StartTime);
        eventAccepted.EndTime = new Date(eventAccepted.EndTime);

        delete eventAccepted.status;
        delete eventAccepted.color;

        this.setState({selectedEvent: eventAccepted});
        this.postAppointmentChange(eventAccepted);
    }

    handleInputChange(event) {
        console.log("handleInputChange: "+event);
        const target = event.target;
        
        var value = '';
        switch(target.type){
            case 'checkbox':
                value = target.checked;
                break;
            case 'number':
                value = parseFloat(target.value);
                break;
            default:
                value = target.value;
                break;
        }

        const name = target.name;
        
        /*if(name === "StartTime" || name==="EndTime"){
            let formattedDate = new Date(value);
            value = formattedDate;
        }*/
        
        let selectedEventTemp = this.state.selectedEvent;
        selectedEventTemp[name] = value;

        this.setState({
          selectedEvent: selectedEventTemp
        });
    }
    
    loadStudentInClass(event) {
        console.log("loadStudentInClass: "+event);
        const target = event.target;
        const name = target.name;

        this.fetchDataStudentClass(target.value);
    }

    loadStudentTeachers(event) {
        console.log("loadStudentTeachers: "+event);
        const target = event.target;
        const name = target.name;

        this.fetchDataTeachings(this.state.parentID, target.value);
    }
    
    postAppointmentChange(selectedEvent){

        var _this = this;
        var request = selectedEvent;
        var data = JSON.stringify(request);

        var endpoint = CONSTANTS.HOST;
        if(this.state.parentID){
            endpoint += "/api/v1/parent/"+this.state.parentID+"/appointments/"+selectedEvent.AppointmentID;
        } else if(this.state.teacherID){
            endpoint += "/api/v1/teacher/"+this.state.teacherID+"/appointments/"+selectedEvent.AppointmentID;
        }

        var headers = this.props.authHeaders;
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        fetch(endpoint, {
            method: "PUT",
            mode: 'cors',
            headers: headers,
            credentials: 'include',
            body: data
        }).then(function(response){
            let jsonRes = response.json()

            if(response.ok){
                _this.setState({
                    resultMessage: {
                        code: response.status,
                        message: 'Appointment updated successfully'
                    }
                });
            } else {
                _this.setState({resultMessage: jsonRes});
            }
            Modals.closeModals("viewEventModal");
            Modals.openModal("resultModal");
        });
    }

    postAppointment(){

        var _this = this;

        var request = this.state.selectedEvent;
        var data = JSON.stringify(request);
        
        console.log(data);

        var headers = this.props.authHeaders;
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        var endpoint = CONSTANTS.HOST;
        endpoint = (this.state.teacherID ? 
            endpoint+"/api/v1/teacher/"+this.state.teacherID+"/appointments" 
            : endpoint+"/api/v1/parent/"+this.state.parentID+"/appointments")
        
        fetch(endpoint, {
            method: "POST",
            mode: 'cors',
            headers: headers,
            credentials: 'include',
            body: data
        }).then(function(response){
            let jsonRes = response.json()
            if(response.ok){
                _this.setState({
                    resultMessage: {
                        code: response.status,
                        message: "Appointment created successfully"
                    }
                });
            } else {
                _this.setState({resultMessage: jsonRes});
            }

            Modals.closeModals("viewEventModal");
            Modals.openModal("resultModal");
        })
        
        /*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err));*/
        
    }

    refreshEvents(){
        console.log("refresh");
        if(this.props.teacherID){
            this.props.loadTeacherEvents()
                .then(() => {
                    //remove old data
                    $('#calendar').fullCalendar('removeEvents');
                     
                    //Getting new event json data
                    $("#calendar").fullCalendar('addEventSource', this.props.eventList);
                    //Updating new events
                    $('#calendar').fullCalendar('rerenderEvents');
                    //getting latest Events
                    //$('#calendar').fullCalendar( 'refetchEvents' );
                    //getting latest Resources
                    //$('#calendar').fullCalendar( 'refetchResources' );
                });
        } else if(this.props.parentID){
            this.props.loadParentEvents()
                .then(() => {
                    //remove old data
                    $('#calendar').fullCalendar('removeEvents');
                     
                    //Getting new event json data
                    $("#calendar").fullCalendar('addEventSource', this.props.eventList);
                    //Updating new events
                    $('#calendar').fullCalendar('rerenderEvents');
                });
        }
        /*
       //remove old data
        $('#calendar').fullCalendar('removeEvents');
        
        //Getting new event json data
        $("#calendar").fullCalendar('addEventSource', this.state.eventList);
        
        //Updating new events
        $('#calendar').fullCalendar('rerenderEvents');

        
        //getting latest Events
        $('#fullCalendar').fullCalendar( 'refetchEvents' );
        //getting latest Resources
        //$('#calendar').fullCalendar( 'refetchResources' );
        */
    }

    //this was created because there was a "this" misunderstanding with fullCalendar
    updateSelectedEvent(calEvent){
        var originalEvent = calEvent && calEvent.originalEvent ? calEvent.originalEvent : {};
        var premiseEventPartecipant;
        var _this = this;

        if(this.state.teacherID){
            premiseEventPartecipant = this.fetchDataPersonalDataParent(originalEvent.ParentID);
        }
        if(this.state.parentID){
            premiseEventPartecipant = this.fetchDataPersonalDataTeacher(originalEvent.TeacherID);
        }
        
        premiseEventPartecipant.then(function(){
            _this.setState((prevState, props) => {return {selectedEvent: originalEvent} });
        });
        //this.setState({selectedEvent: originalEvent});
    }

    newEvent(){
        this.setState({selectedEvent: {} });
    }

    callBackRefreshEvents(eventList){
        return eventList;
    }
                
}

class External extends React.Component {
          render() {
            return <div id='external-events'>
                    <h4>Draggable Events</h4>
                    <div className='fc-event'>My Event 1</div>
                    <div className='fc-event'>My Event 2</div>
                    <div className='fc-event'>My Event 3</div>
                    <div className='fc-event'>My Event 4</div>
                    <div className='fc-event'>My Event 5</div>
                    <p>
                        <input type='checkbox' id='drop-remove' />
                        <label for='drop-remove'>remove after drop</label>
                    </p>
                </div>;
          }
          componentDidMount() {
                $('#external-events .fc-event').each(function() {

                    // store data so the calendar knows to render an event upon drop
                    $(this).data('event', {
                        title: $.trim($(this).text()), // use the element's text as the event title
                        stick: true // maintain when user navigates (see docs on the renderEvent method)
                    });

                    // make the event draggable using jQuery UI
                    $(this).draggable({
                        zIndex: 999,
                        revert: true,      // will cause the event to go back to its
                        revertDuration: 0  //  original position after the drag
                    });
                });
          }
}