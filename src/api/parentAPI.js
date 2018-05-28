import * as CONSTANTS from './apiUtils';

export function fetchDataNotifications(parentID){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/notifications?id="+parentID)
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            notificationList: result
        })
    );
}

export function fetchDataParentStudents(parentID){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/students?id="+parentID)
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            studentList: result
        })
    );
}

export function fetchDataParentAppointments(parentID){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/appointments?id="+parentID)
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            appointmentList: result
        })
    );
}


//http://localhost:8080/api/v1/parent/students/grades?id=P1&semester=2
export function fetchDataStudentGrades(parentID){
    
    let endpoint = CONSTANTS.HOST+"/api/v1/parent/students/grades?id="+parentID;
    
    return fetch(endpoint)
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            gradesList: result
        })
    );
}