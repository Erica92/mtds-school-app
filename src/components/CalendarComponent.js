import React from 'react';
import './Calendar.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import '../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import * as Modals from './ModalComponents';
import {ModalViewEvent,ModalAddEvent} from './ModalComponents';
import * as Utils from '../utils/Utils';
import * as TeacherApi from '../api/teacherAPI';
import * as CONSTANTS from '../api/apiUtils';

import $ from 'jquery';
window.jQuery = $;
require('fullcalendar');

export default class Calendar extends React.Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
            teacherID: this.props.teacherID,
            eventList: this.props.eventList,
            selectedEvent: {},
            classList: this.props.classList,
            studentClassList: []
        }
        Utils.updateSelectedEvent = Utils.updateSelectedEvent.bind(this);
        TeacherApi.fetchDataStudentClass = TeacherApi.fetchDataStudentClass.bind(this);
        this.makeEmptyEvent = this.makeEmptyEvent.bind(this);
        this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    render() {
        return (
            <div>
                <div id="calendar"></div>
                <ModalViewEvent event={this.state.selectedEvent} />
                <ModalAddEvent event={this.state.selectedEvent} 
                    classList={this.state.classList} loadStudentInClass={this.loadStudentInClass} studentClassList={this.state.studentClassList}
                    onSubmit={this.handleSubmitEvent} handleInputChange={this.handleInputChange} />
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
    
    handleSubmitEvent(event) {
        event.preventDefault();
        var selectedEventTmp = this.state.selectedEvent;
        selectedEventTmp["TeacherID"] = this.state.teacherID;
        selectedEventTmp["ParentID"] = '';
        //selectedEventTmp["StudentID"] = '';
        delete selectedEventTmp['class'];
        
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
        
        let selectedEventTemp = this.state.selectedEvent;
        selectedEventTemp[name] = value;

        this.setState({
          gradeMod: selectedEventTemp
        });
    }
    
    loadStudentInClass(event) {
        console.log("loadStudentInClass: "+event);
        const target = event.target;
        const name = target.name;

        TeacherApi.fetchDataStudentClass(target.value);
    }
    
    postAppointment(){

        var request = this.state.selectedEvent;
        var data = JSON.stringify(request);
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/teacher/appointment", {
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