import * as CONSTANTS from './apiUtils';

export function fetchDataTeacherAppointments(teacherID){
    fetch(CONSTANTS.HOST+"/api/v1/teacher/appointments?id="+teacherID)
        .then(response => response.json())
        .then( (result) => this.setState({
            appointmentsList: result,
            isLoading: false
        })
    );
}

export function fetchDataSchedule(teacherID, scope){
    fetch(CONSTANTS.HOST+"/api/v1/teacher/agenda?id="+teacherID+"&scope="+scope)
        .then(response => response.json())
        .then( (result) => ( result == null )? 
             this.setState({isLoading: false, schedule: []})
            : this.setState({isLoading: false, schedule: result
        })
    );
}