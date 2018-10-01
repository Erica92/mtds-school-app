import * as CONSTANTS from './apiUtils';
import * as Modals from '../components/ModalComponents';

const PARENT_BASE_ENDPOINT = "/api/v1/parent/";

export function fetchDataNotifications(parentID){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/"+parentID+"/notifications")
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            notificationList: result
        })
    );
}

export function fetchDataParentStudents(parentID){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/"+parentID+"/students")
        .then(response => response.json())
        .then((result) => result.map((elem) => elem.Student))
        .then( (resultList) => this.setState({
            isLoading: false,
            studentList: resultList
        })
    );
}

export function fetchDataParentAppointments(parentID, scope){

    var endpoint = CONSTANTS.HOST+"/api/v1/parent/"+parentID+"/appointments";

    if(scope){
        endpoint += "?scope="+scope;
    }

    return fetch(endpoint)
        .then(response => response.json())
        .then((result) => result.map((elem) => elem.Appointment))
        .then( (resultList) => this.setState({
            isLoading: false,
            appointmentsList: resultList
        })
    );
}

export function fetchDataPersonalDataParent(username){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/"+username+"/info")
        .then(response => response.json())
        .then( (result) => this.setState({
            parentInfo: result,
            isLoading: false
        })
    );
}

export function fetchDataPersonalDataStudent(username,studentID){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/"+username+"/students/"+studentID)
        .then(response => response.json())
        .then( (result) => this.setState({
            studentInfo: result,
            isLoading: false
        })
    );
}


//http://localhost:8080/api/v1/parent/students/grades?id=P1&semester=2
export function fetchDataStudentGrades(parentID, studentID, semester){
    
    let userType;

    let endpoint;
    if(parentID){
        userType = "parent";
        endpoint = CONSTANTS.HOST+"/api/v1/parent/"+parentID+"/students/"+studentID+"/grades";
    } else {
        userType = "admin";
        endpoint = CONSTANTS.HOST+"/api/v1/student/"+studentID+"/grades";
    }
    if(semester) endpoint += "?semester="+semester;
    
    if(userType === "parent")
    {
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
    } else {
        return fetch(endpoint)
            .then(response => response.json())
            .then( (result) => 
                {if(result && result.length > 0){
                    this.setState({
                        isLoading: false,
                        gradesList: []//result[0].SubjectGrades
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        gradesList: []
                    })
                }}
        );
    }
}

export function fetchDataPayment(username, status){
    let endpoint = CONSTANTS.HOST+"/api/v1/parent/"+username+"/payments";
    if(status){
        endpoint += "?status="+status;
    }

    var outerThis = this;
    
    return fetch(endpoint)
        .then(response => response.json())
        .then((result) => result.map((elem) => elem.Payment))
        .then(function(resultList){
            console.log("nella fun");
            if(status == 2){
                outerThis.setState({
                    paymentListHistory: resultList,
                    isLoading: false
                });
            } else if(status == 1){
                outerThis.setState({
                    paymentList: resultList,
                    isLoading: false
                });
            }
        });
}

function setStatePaymentList(result, status){
    let stateToReturn = null;
    
    if(status == 2){
        stateToReturn = {
            paymentListHistory: result,
        };
    } else {
        stateToReturn = {
            paymentList: result,
        };
    }
    console.log("status:"+status+" stateToReturn:"+result);
    return stateToReturn;
}

export function postParentPayment(selectedPayment, cardInfo, parentID, goToPage){
        //var form = new FormData(document.getElementById('DataForm'));
        
        var paymentInfo = {
            Payment: selectedPayment,
            CreditCard: cardInfo
        }

        var data = JSON.stringify(paymentInfo);
        
        console.log(data);
        
        var premResponse = fetch(CONSTANTS.HOST+"/api/v1/parent/"+parentID+"/payments", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        });
        
        var premJsonRes = premResponse.then((res) => res.json());

        Promise.all([premResponse,premJsonRes]).then(([response,data]) => {
            
            if(response.ok){
                this.setState({
                    paymentResult: {
                        code: response.status,
                        message: 'Payment saccessfull'
                    }
                });
            } else {
                this.setState({
                    paymentResult: data
                });
            }
            
            Modals.openModal("resultModal");

            /*
            this.fetchDataPersonalDataParent(this.state.parentID)
                .then(() => {         
                    let parentOrig = Object.assign({}, this.state.parentInfo);
                    this.setState({parentInfoMod: parentOrig});
            })*/
        });/*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))*/
    }

export function fetchDataTeachings(parentID, studentID){
    return fetch(CONSTANTS.HOST+"/api/v1/parent/"+parentID+"/students/"+studentID+"/subjects")
        .then(response => response.json())
        .then((result) => result.map((elem) => elem.TeachClass))
        .then( (resultList) => this.setState({
            teachings: resultList,
            isLoading: false
        })
    );
}