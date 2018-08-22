import React from 'react';
import './Calendar.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import '../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import * as Modals from './ModalComponents';
import {ModalViewEvent,ModalAddEvent,ModalAddEventParent} from './ModalComponents';
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
            teachings: []
        }
        Utils.updateSelectedEvent = Utils.updateSelectedEvent.bind(this);
        this.fetchDataStudentClass = TeacherApi.fetchDataStudentClass.bind(this);
        this.fetchDataTeachings = ParentApi.fetchDataTeachings.bind(this);
        this.loadStudentTeachers = this.loadStudentTeachers.bind(this);
        this.makeEmptyEvent = this.makeEmptyEvent.bind(this);
        this.handleSubmitEventParent = this.handleSubmitEventParent.bind(this);
        this.handleSubmitEventTeacher = this.handleSubmitEventTeacher.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loadStudentInClass = this.loadStudentInClass.bind(this);
    }
    
    render() {
        var modalAddEventToRender;
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
                                onSubmit={this.handleSubmitEventParent} handleInputChange={this.handleInputChange} />
                {modalAddEventToRender}
            </div>
        );
    }
    
    makeEmptyEvent(){
        return({title: '', start:'', end:'', allDay:false});
    }
    

    componentDidMount() {

        $('#calendar').fullCalendar({
                    customButtons: {
                        addEventButton: {
                          text: 'New Appointment',
                          click: function() {
                            Utils.updateSelectedEvent({});
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
                    editable: true,
                    droppable: true, // this allows things to be dropped onto the calendar
                    drop: function() {
                        // is the "remove after drop" checkbox checked?
                        if ($('#drop-remove').is(':checked')) {
                            // if so, remove the element from the "Draggable Events" list
                            $(this).remove();
                        }
                    },
                    eventClick: function(calEvent, jsEvent, view){
                        Utils.updateSelectedEvent(calEvent);
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
        
        delete selectedEventTmp['class'];
        delete selectedEventTmp['title'];
        
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
        
        delete selectedEventTmp['class'];
        delete selectedEventTmp['title'];
        
        this.setState({
          selectedEvent: selectedEventTmp
        });
        this.postAppointment();
        Modals.closeModals("addEventModal");
    }
    //{"StudentID":"","title":"aaaaaaaaa","fullday":false,"startDate":"2018-05-22T10:30","endDate":"2018-05-22T12:30","ParentID":""} why?
    
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
        
        if(name === "StartTime" || name==="EndTime"){
            let formattedDate = new Date(value);
            value = formattedDate;
        }
        
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
    
    postAppointment(){

        var request = this.state.selectedEvent;
        var data = JSON.stringify(request);
        
        console.log(data);

        var endpoint = CONSTANTS.HOST;
        endpoint = (this.state.teacherID ? endpoint+"/api/v1/teacher/appointment" : endpoint+"/api/v1/parent/appointment")
        
        fetch(endpoint, {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        }).then(function(response){
            if(response.ok){
                //TODO handle update page
            } else {
                //TODO eventually handle error messages
            }
        });
        
        /*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err));*/
        
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