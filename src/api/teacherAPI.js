import * as CONSTANTS from './apiUtils';

export function fetchDataTeacherAppointments(teacherID){
    return fetch(CONSTANTS.HOST+"/api/v1/teacher/appointments?id="+teacherID)
        .then(response => response.json())
        .then( (result) => this.setState({
            appointmentsList: result,
            isLoading: false
        })
    )
};

export function fetchDataSchedule(teacherID, scope){
    let endpoint = CONSTANTS.HOST+"/api/v1/teacher/agenda?id="+teacherID;
    if(scope != null){
        endpoint += "&scope="+scope;
    }
    return fetch(endpoint)
        .then(response => response.json())
        .then( (result) => ( result == null )? 
             this.setState({isLoading: false, schedule: []})
            : this.setState({isLoading: false, schedule: result
        })
    )
};

export function fetchDataStudentClass(classID){
    fetch(CONSTANTS.HOST+"/api/v1/class/students?class="+classID)
        .then(response => response.json())
        .then( (result) => this.setState({
            studentClassList: result,
            isLoading: false
        })
    );
}

export function fetchDataStudentGrades(teacherID, classID, subject){
    fetch(CONSTANTS.HOST+"/api/v1/teacher/grades?id="+teacherID+"&class="+classID+"&subject="+subject+"&object=student")
        .then(response => response.json())
        .then( (result) => this.setState({
            studentsGradesList: {
                data: result,
                isLoading: false
            }
        })
    );
}

export function fetchDataPersonalDataTeacher(username){
    return (fetch(CONSTANTS.HOST+"/api/v1/teacher/info?id="+username)
        .then(response => response.json())
        .then( (result) => this.setState({
            teacherInfo: result,
            isLoading: false
        })
    ));
}