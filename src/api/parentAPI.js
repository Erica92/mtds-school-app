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

export function fetchDataPersonalDataParent(username){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/info?id="+username)
        .then(response => response.json())
        .then( (result) => this.setState({
            parentInfo: result,
            isLoading: false
        })
    );
}

export function fetchDataPersonalDataStudent(username){
    return fetch(CONSTANTS.HOST+"/api/v1/student/info?id="+username)
        .then(response => response.json())
        .then( (result) => this.setState({
            studentInfo: result,
            isLoading: false
        })
    );
}


//http://localhost:8080/api/v1/parent/students/grades?id=P1&semester=2
export function fetchDataStudentGrades(parentID, studentID){
    
    let endpoint = CONSTANTS.HOST+"/api/v1/parent/students/grades?id="+parentID;
    if(studentID) endpoint += "&studentid="+studentID;
    
    return fetch(endpoint)
        .then(response => response.json())
        .then( (result) => 
              {if(result && result.length > 0){
                this.setState({
                    isLoading: false,
                    gradesList: result[0].SubjectGrades
                })
            } else {
                this.setState({
                    isLoading: false,
                    gradesList: []
                })
            }}
    );
}

export function fetchDataPayment(username){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/payments?id="+username)
        .then(response => response.json())
        .then( (result) => this.setState({
            paymentList: result,
            isLoading: false
        })
    );
}
