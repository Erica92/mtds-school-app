import * as CONSTANTS from './apiUtils';
import * as Modals from '../components/ModalComponents';

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

export function fetchDataParentAppointments(parentID, scope){

    var endpoint = CONSTANTS.HOST+"/api/v1/parent/appointments?id="+parentID;

    if(scope){
        endpoint += "&scope="+scope;
    }

    return fetch(endpoint)
        .then(response => response.json())
        .then( (result) => this.setState({
            isLoading: false,
            appointmentsList: result
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

export function fetchDataPayment(username, status){
    let endpoint = CONSTANTS.HOST+"/api/v1/parent/payments?id="+username;
    if(status){
        endpoint += "&status="+status;
    }

    var outerThis = this;
    
    return fetch(endpoint)
        .then(response => response.json())
        .then(function(result){
            console.log("nella fun");
            if(status == 2){
                outerThis.setState({
                    paymentListHistory: result,
                    isLoading: false
                });
            } else if(status == 1){
                outerThis.setState({
                    paymentList: result,
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

export function postParentPayment(selectedPayment, cardInfo, goToPage){
        //var form = new FormData(document.getElementById('DataForm'));
        
        var paymentInfo = {
            Payment: selectedPayment,
            CreditCard: cardInfo
        }

        var data = JSON.stringify(paymentInfo);
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/parent/payments", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        }).then((res) => res.json())
            .then((data) => {
            console.log("data:"+data);
            
            this.setState({
                paymentResult: data
            });

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
    return fetch(CONSTANTS.HOST+"/api/v1/parent/teachings?id="+parentID+"&student="+studentID)
        .then(response => response.json())
        .then( (result) => this.setState({
            teachings: result,
            isLoading: false
        })
    );
}