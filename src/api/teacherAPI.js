import * as CONSTANTS from './apiUtils';

export function fetchDataTeacherAppointments(teacherID){
    return fetch(CONSTANTS.HOST+"/api/v1/teacher/"+teacherID+"/appointments")
        .then(response => response.json())
        .then((result) => result.map((elem) => elem.Appointment))
        .then( (resultList) => this.setState({
            appointmentsList: resultList,
            isLoading: false
        })
    )
};

export function fetchDataSchedule(teacherID, scope, classId){
    let endpoint = CONSTANTS.HOST+"/api/v1/teacher/"+teacherID+"/agenda";
    let params = "";
    if(scope != null){
        params += (params ? "&scope="+scope : "?scope="+scope);
    }
    if(classId != null){
        params += (params ? "&class="+classId : "?class="+classId);
    }
    endpoint += params;

    return fetch(endpoint)
        .then(response => response.json())
        .then( (result) => this.setState({
            scheduleList: result,
            isLoading: false
            })
        );
};

export function fetchDataStudentClass(classID){
    fetch(CONSTANTS.HOST+"/api/v1/classes/"+classID+"/students")
        .then(response => response.json())
        .then( (result) => result.map((student) => student.Student))
        .then((studentList) => this.setState({
                studentClassList: studentList,
                isLoading: false
            })
        );
}



export function fetchDataStudentGrades(teacherID, classID, subject){
    fetch(CONSTANTS.HOST+"/api/v1/teacher/"+teacherID+"/classes/"+classID+"/grades?subject="+subject+"&object=student")
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
    return (fetch(CONSTANTS.HOST+"/api/v1/teacher/"+username+"/info")
        .then(response => response.json())
        .then( (result) => this.setState({
            teacherInfo: result,
            isLoading: false
        })
    ));
}