import * as CONSTANTS from './apiUtils';



export function fetchDataNotifications(){
    return fetch(CONSTANTS.HOST+"/api/v1/admin/notification")
        .then(response => response.json())
        .then( (result) => this.setState({
                isLoading: false,
                notificationList: result
            })
        );
}

export function fetchDataClasses(){
    fetch(CONSTANTS.HOST+"/api/v1/admin/classes")
        .then(response => response.json())
        .then( (result) => this.setState({
            classList: result,
            isLoading: false
        })
    );
}


export function fetchDataStudentClass(classID){
    fetch(CONSTANTS.HOST+"/api/v1/class/students?class="+classID)
        .then(response => response.json())
        .then( (result) => this.setState({
                studentClassList: {
                    data: result,
                    isLoading: false
                }
            })
        );
}
