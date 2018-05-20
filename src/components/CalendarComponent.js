import React from 'react';
import './Calendar.css';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import '../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import * as Modals from './ModalComponents';
import {ModalViewEvent,ModalAddEvent} from './ModalComponents';
import * as Utils from '../utils/Utils';

import $ from 'jquery';
window.jQuery = $;
require('fullcalendar');

export default class Calendar extends React.Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
            eventList: this.props.eventList,
            selectedEvent: {}
        }
        Utils.updateSelectedEvent = Utils.updateSelectedEvent.bind(this);
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
    
    handleSubmitEvent(event) {
        event.preventDefault();
        var selectedEventTmp = this.state.selectedEvent;
        /*selectedEventTmp["TeacherID"] = this.state.teacher;
        selectedEventTmp["Subject"] = this.state.selectedClass.Subject;
        console.log("gradeModTemp.Date:"+gradeModTemp.Date);
        selectedEventTmp["Year"] = Utils.dateStringToDate(gradeModTemp.Date).getFullYear();
        selectedEventTmp["Semester"] = 1;
        selectedEventTmp["Date"] = Utils.dateStringToDate(gradeModTemp.Date).toJSON();*/
        
        //console.log("Utils.dateStringToDate(gradeModTemp.Date)"+Utils.dateStringToDate(gradeModTemp.Date));
        this.setState({
          selectedEvent: selectedEventTmp
        });
        //this.postSingleGrade();
        Modals.closeModals("addEventModal");
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
        
        let selectedEventTemp = this.state.selectedEvent;
        selectedEventTemp[name] = value;

        this.setState({
          gradeMod: selectedEventTemp
        });
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