import * as CONSTANTS from './apiUtils';

export function fetchDataNotifications(parentID){
    fetch(CONSTANTS.HOST+"/api/v1/parent/notifications?id="+this.state.parentID)
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            notificationList: result
        })
    );
}

export function fetchDataParentStudents(parentID){
    fetch(CONSTANTS.HOST+"/api/v1/parent/students?id="+this.state.parentID)
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            studentList: result
        })
    );
}